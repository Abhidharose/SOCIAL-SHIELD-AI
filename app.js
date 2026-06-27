let isBackendLive = false;
const API_BASE_URL = "http://localhost:8000";

async function checkBackendHealth() {
  const badge = document.getElementById("backend-status-badge");
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (response.ok) {
      const data = await response.json();
      if (data.status === "healthy") {
        isBackendLive = true;
        if (badge) {
          badge.className = "backend-status-badge live-mode";
          badge.querySelector(".badge-text").textContent = "LIVE AI MODE";
        }
        return;
      }
    }
  } catch (e) {
    // Ignore error, fallback to mock mode
  }
  isBackendLive = false;
  if (badge) {
    badge.className = "backend-status-badge mock-mode";
    badge.querySelector(".badge-text").textContent = "MOCK MODE";
  }
}

// Ensure Lucide icons render initially
document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
  initializeNavigation();
  initializeAgentTelemetry();
  initializeScamSimulator();
  initializeThreatAnalyzer();
  initializeEducationQuiz();
  initializeArchitectureSVG();
  
  // Initialize and run health checks
  checkBackendHealth();
  setInterval(checkBackendHealth, 15000);
});


/* ==========================================
   1. NAVIGATION & SPA ROUTER
   ========================================== */
function initializeNavigation() {
  const landingPage = document.getElementById("landing-page-view");
  const dashboardView = document.getElementById("dashboard-view");
  const navLogo = document.getElementById("nav-logo");
  const landingLinks = document.getElementById("landing-nav-links");
  const launchBtn = document.getElementById("launch-app-btn");
  const heroBtn = document.getElementById("hero-get-started");
  const heroLearnMore = document.getElementById("hero-learn-more");
  const ctaBtn = document.getElementById("cta-launch-btn");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const sidebarBtns = document.querySelectorAll(".sidebar-btn");
  const dashboardPanels = document.querySelectorAll(".dashboard-panel");

  // Switch to Dashboard
  function showDashboard() {
    landingPage.classList.add("hidden");
    dashboardView.classList.remove("hidden");
    landingLinks.classList.add("hidden");
    launchBtn.textContent = "Exit Dashboard";
    launchBtn.classList.remove("btn-cyber-solid");
    launchBtn.classList.add("btn-cyber-purple");
    // Auto-scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Switch to Landing Page
  function showLanding() {
    dashboardView.classList.add("hidden");
    landingPage.classList.remove("hidden");
    landingLinks.classList.remove("hidden");
    launchBtn.textContent = "Launch Dashboard";
    launchBtn.classList.remove("btn-cyber-purple");
    launchBtn.classList.add("btn-cyber-solid");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Launch button toggle behavior
  launchBtn.addEventListener("click", () => {
    if (dashboardView.classList.contains("hidden")) {
      showDashboard();
    } else {
      showLanding();
    }
  });

  // Logo home navigation
  navLogo.addEventListener("click", showLanding);

  // Landing Page smooth scroll triggers
  const navItems = landingLinks.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      showLanding();
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const targetId = item.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Hero CTAs
  heroBtn.addEventListener("click", showDashboard);
  ctaBtn.addEventListener("click", showDashboard);
  heroLearnMore.addEventListener("click", () => {
    const targetElement = document.getElementById("agents-overview");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // Dashboard Sidebar switching
  sidebarBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sidebarBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const targetPanelId = btn.getAttribute("data-panel");
      dashboardPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.remove("hidden");
        } else {
          panel.classList.add("hidden");
        }
      });
    });
  });

  // Mobile menu stub toggle
  mobileMenuBtn.addEventListener("click", () => {
    if (dashboardView.classList.contains("hidden")) {
      showDashboard();
    } else {
      showLanding();
    }
  });
}

/* ==========================================
   2. DYNAMIC SYSTEM TELEMETRY (CPU, RAM, LOGS)
   ========================================== */
/* ==========================================
   2. MULTI-AGENT ORCHESTRATOR TELEMETRY & ANIMATIONS
   ========================================== */
let activeAgentStates = {
  psy: true,
  link: true,
  dfake: true,
  meta: true
};

function initializeAgentTelemetry() {
  const clearAgentLogBtn = document.getElementById("clear-agent-log-btn");
  const logsContainer = document.getElementById("agent-console-logs");
  const simulateBtn = document.getElementById("orch-simulate-btn");

  // Dynamic statistics fluctuation on the top bar & agent chips
  let totalMessages = 12847;
  let totalUrls = 3291;
  let totalThreats = 487;
  let totalReports = 412;
  let avgConfidence = 94.2;

  // Periodically increment stats slightly to show live SOC activity
  setInterval(() => {
    if (Math.random() > 0.4) {
      totalMessages += Math.floor(Math.random() * 3) + 1;
      if (Math.random() > 0.7) totalUrls += 1;
      if (Math.random() > 0.95) totalThreats += 1;
      if (Math.random() > 0.9) totalReports += 1;
      
      avgConfidence = parseFloat((93.5 + Math.random() * 1.5).toFixed(1));

      // Update Top Stats Bar
      const msgEl = document.getElementById("orch-messages-val");
      const urlEl = document.getElementById("orch-urls-val");
      const threatEl = document.getElementById("orch-threats-val");
      const confEl = document.getElementById("orch-confidence-val");
      const repEl = document.getElementById("orch-reports-val");

      if (msgEl) msgEl.textContent = totalMessages.toLocaleString();
      if (urlEl) urlEl.textContent = totalUrls.toLocaleString();
      if (threatEl) threatEl.textContent = totalThreats.toLocaleString();
      if (confEl) confEl.textContent = `${avgConfidence}%`;
      if (repEl) repEl.textContent = totalReports.toLocaleString();

      // Fluctuate individual agent telemetry chips slightly
      const psyMsgs = document.getElementById("psy-msgs");
      const linkUrls = document.getElementById("link-urls");
      const dfakeImgs = document.getElementById("dfake-imgs");
      const metaPackets = document.getElementById("meta-packets");

      if (psyMsgs) psyMsgs.textContent = (4213 + Math.floor(totalMessages - 12847)).toLocaleString();
      if (linkUrls) linkUrls.textContent = (3291 + Math.floor(totalUrls - 3291)).toLocaleString();
      if (dfakeImgs) dfakeImgs.textContent = (1087 + Math.floor((totalMessages - 12847) * 0.1)).toLocaleString();
      if (metaPackets) metaPackets.textContent = (8442 + Math.floor((totalMessages - 12847) * 0.6)).toLocaleString();
    }
  }, 4000);

  // Fluctuate CPU/RAM on main dashboard Command Tab
  const dashboardCpuLoadEl = document.getElementById("dashboard-cpu-load");
  setInterval(() => {
    let cpuVal = (8.5 + Math.random() * 9.5).toFixed(1);
    if (dashboardCpuLoadEl) {
      dashboardCpuLoadEl.textContent = `${cpuVal}%`;
    }
  }, 2500);

  // Fluctuate chart coordinates periodically
  setInterval(updateDashboardChartData, 8000);

  // Clear logs button
  if (clearAgentLogBtn && logsContainer) {
    clearAgentLogBtn.addEventListener("click", () => {
      logsContainer.innerHTML = `<div class="console-log-row"><span class="log-timestamp">[${getTimestamp()}]</span><span class="log-source meta">[ORCHESTRATOR]</span><span class="log-message">Swarm logs cleared.</span></div>`;
    });
  }

  // Periodically log random background chatter to simulate active swarm communications
  const backgroundChatterPool = [
    { source: "psy", msg: "Scanning background processes... semantic index loaded." },
    { source: "link", msg: "Local cache refresh: 142 blacklisted domains synced." },
    { source: "dfake", msg: "Frame interpolation analysis standing by." },
    { source: "meta", msg: "Watching outbound ports for suspicious routing anomalies." },
    { source: "psy", msg: "Linguistic entropy metrics verified at normal levels." }
  ];

  setInterval(() => {
    // Only chatter when not actively running a scan
    const simulateBtn = document.getElementById("orch-simulate-btn");
    if (simulateBtn && simulateBtn.disabled) return; 

    if (Math.random() > 0.5) {
      let log = backgroundChatterPool[Math.floor(Math.random() * backgroundChatterPool.length)];
      logAgentComms(log.source, log.msg);
    }
  }, 6000);

  // Standalone Swarm Simulation Trigger
  if (simulateBtn) {
    const simulationCopies = [
      {
        text: "URGENT: Your Chase Bank security card has been suspended. Please login immediately to reactivate your credentials: http://chase-secure-auth.xyz/login. Failure to comply in 24 hours will lock your account.",
        score: 87,
        verdict: "CRITICAL"
      },
      {
        text: "Hey! Just wanted to let you know we're going to the movies tonight. Let me know if you want to join us around 7 PM! Take care.",
        score: 6,
        verdict: "SAFE"
      },
      {
        text: "Hello! We detected a suspicious login attempt on your account from IP 192.168.1.10. If this was not you, please verify your identity here: http://paypal-resolution-center.net/pin",
        score: 72,
        verdict: "SUSPICIOUS"
      }
    ];

    simulateBtn.addEventListener("click", () => {
      // Pick random scenario
      const scenario = simulationCopies[Math.floor(Math.random() * simulationCopies.length)];
      
      // Temporarily switch button text
      simulateBtn.disabled = true;
      simulateBtn.innerHTML = `<span class="step-spinner" style="width:10px;height:10px;margin-right:8px;"></span>Running Swarm Consensus...`;
      
      // Clear logs container of background chatter before running scenario
      if (logsContainer) {
        logsContainer.innerHTML = `<div class="console-log-row"><span class="log-timestamp">[${getTimestamp()}]</span><span class="log-source meta">[ORCHESTRATOR]</span><span class="log-message">Starting user-triggered simulation scan...</span></div>`;
      }

      animateOrchestratorSwarm(scenario.text, scenario.score, scenario.verdict, () => {
        simulateBtn.disabled = false;
        simulateBtn.innerHTML = `<i data-lucide="play-circle" style="width:14px;height:14px;"></i>Simulate Multi-Agent Analysis`;
        if (typeof lucide !== "undefined") lucide.createIcons();
      });
    });
  }
}

// ─── SWARM CONSENSUS ANIMATION ENGINE ──────────────────────────────────────
function animateOrchestratorSwarm(text, score, verdict, callback) {
  const cards = {
    psy: document.getElementById("orch-card-psy"),
    link: document.getElementById("orch-card-link"),
    dfake: document.getElementById("orch-card-dfake"),
    meta: document.getElementById("orch-card-meta")
  };
  
  const stateBadges = {
    psy: document.getElementById("state-psy"),
    link: document.getElementById("state-link"),
    dfake: document.getElementById("state-dfake"),
    meta: document.getElementById("state-meta")
  };

  const progressLabels = {
    psy: document.getElementById("psy-progress-label"),
    link: document.getElementById("link-progress-label"),
    dfake: document.getElementById("dfake-progress-label"),
    meta: document.getElementById("meta-progress-label")
  };

  const progressFills = {
    psy: document.getElementById("psy-progress-fill"),
    link: document.getElementById("link-progress-fill"),
    dfake: document.getElementById("dfake-progress-fill"),
    meta: document.getElementById("meta-progress-fill")
  };

  const progressWraps = {
    psy: document.getElementById("psy-progress-wrap"),
    link: document.getElementById("link-progress-wrap"),
    dfake: document.getElementById("dfake-progress-wrap"),
    meta: document.getElementById("meta-progress-wrap")
  };

  const votes = {
    psy: document.getElementById("vote-psy"),
    link: document.getElementById("vote-link"),
    dfake: document.getElementById("vote-dfake"),
    meta: document.getElementById("vote-meta")
  };

  const dtSteps = {
    psy: document.getElementById("dt-step-psy"),
    link: document.getElementById("dt-step-link"),
    dfake: document.getElementById("dt-step-dfake"),
    meta: document.getElementById("dt-step-meta")
  };

  const dtActions = {
    psy: document.getElementById("dt-action-psy"),
    link: document.getElementById("dt-action-link"),
    dfake: document.getElementById("dt-action-dfake"),
    meta: document.getElementById("dt-action-meta")
  };

  const dtOutputs = {
    psy: document.getElementById("dt-output-psy"),
    link: document.getElementById("dt-output-link"),
    dfake: document.getElementById("dt-output-dfake"),
    meta: document.getElementById("dt-output-meta")
  };

  const dtTimes = {
    psy: document.getElementById("dt-time-psy"),
    link: document.getElementById("dt-time-link"),
    dfake: document.getElementById("dt-time-dfake"),
    meta: document.getElementById("dt-time-meta")
  };

  const gaugeNeedle = document.getElementById("orch-gauge-needle");
  const gaugeArc = document.getElementById("orch-gauge-arc");
  const consensusNum = document.getElementById("orch-consensus-num");

  // Step connectors
  const connectors = document.querySelectorAll(".orch-dt-connector");

  // Reset UI elements prior to scan
  Object.keys(cards).forEach(key => {
    if (cards[key]) {
      cards[key].className = "orch-agent-card";
      if (stateBadges[key]) stateBadges[key].textContent = "STANDBY";
      if (progressWraps[key]) progressWraps[key].classList.add("hidden");
      if (progressFills[key]) progressFills[key].style.width = "0%";
      if (progressLabels[key]) progressLabels[key].textContent = "Initializing...";
      if (votes[key]) {
        votes[key].textContent = "PENDING";
        votes[key].className = "orch-vote-verdict";
      }
    }
  });

  // Reset timeline
  Object.keys(dtSteps).forEach(key => {
    if (dtSteps[key]) {
      const dot = dtSteps[key].querySelector(".orch-dt-dot");
      if (dot) {
        dot.className = "orch-dt-dot pending";
      }
      if (dtActions[key]) dtActions[key].textContent = "Awaiting trigger...";
      if (dtOutputs[key]) {
        dtOutputs[key].classList.add("hidden");
        dtOutputs[key].innerHTML = "";
      }
      if (dtTimes[key]) dtTimes[key].textContent = "—";
    }
  });

  connectors.forEach(conn => {
    conn.className = "orch-dt-connector";
  });

  if (gaugeNeedle) gaugeNeedle.setAttribute("transform", "rotate(-90 60 65)");
  if (gaugeArc) gaugeArc.style.strokeDashoffset = "157";
  if (consensusNum) consensusNum.textContent = "0%";

  logAgentComms("meta", `Consensus process initiated. Threat copy length: ${text.length} chars.`, "info");

  // Execute Agent Scans Sequentially (PsyAgent -> LinkAgent -> DeepfakeAgent -> MetaAgent)
  let timeline = [
    {
      agent: "psy",
      scanLabel: "Scanning vocabulary vectors...",
      procLabel: "Auditing manipulation tactics...",
      compLabel: "Completed semantic mapping.",
      run: (done) => {
        logAgentComms("psy", "Analyzing linguistic intent and cognitive vectors...");
        
        let localVote = "SAFE";
        let findings = [];
        const lcText = text.toLowerCase();
        
        if (lcText.includes("urgent") || lcText.includes("immediately") || lcText.includes("24 hours")) {
          findings.push("Detected high linguistic urgency pressure.");
          localVote = "SUSPICIOUS";
        }
        if (lcText.includes("bank") || lcText.includes("paypal") || lcText.includes("chase") || lcText.includes("billing")) {
          findings.push("Brand authority spoofing marker discovered.");
          localVote = score > 75 ? "MALICIOUS" : "SUSPICIOUS";
        }
        if (findings.length === 0) {
          findings.push("No urgent or malicious psychological lures detected.");
        }
        
        done(localVote, `PsyAgent Output: ${findings.join(" ")}`);
      }
    },
    {
      agent: "link",
      scanLabel: "Parsing URL structures...",
      procLabel: "Resolving redirect paths...",
      compLabel: "Completed URL audit.",
      run: (done) => {
        logAgentComms("link", "Scanning hyperlinks and domains...");
        
        let localVote = "SAFE";
        let findings = [];
        const lcText = text.toLowerCase();
        
        const urlMatch = text.match(/https?:\/\/[^\s]+/gi) || [];
        if (urlMatch.length > 0) {
          findings.push(`Scanned URL: ${urlMatch[0]}`);
          if (lcText.includes(".xyz") || lcText.includes(".top") || lcText.includes(".cc")) {
            findings.push("Found suspicious TLD extension.");
            localVote = "MALICIOUS";
          } else {
            localVote = "SUSPICIOUS";
          }
        } else {
          findings.push("No hyperlinks detected in threat copy.");
        }
        
        done(localVote, `LinkAgent Output: ${findings.join(" ")}`);
      }
    },
    {
      agent: "dfake",
      scanLabel: "Decomposing media metadata...",
      procLabel: "Testing GAN boundary distortions...",
      compLabel: "Completed visual trace.",
      run: (done) => {
        logAgentComms("dfake", "Checking screenshot visual structures for synthetic manipulation...");
        
        let localVote = "SAFE";
        let findings = ["No synthetic face/voice anomalies found in attachments."];
        
        done(localVote, `DeepfakeAgent Output: ${findings[0]}`);
      }
    },
    {
      agent: "meta",
      scanLabel: "Disassembling message envelope...",
      procLabel: "Looking up routing integrity...",
      compLabel: "Completed envelope verify.",
      run: (done) => {
        logAgentComms("meta", "Analyzing network routing footprints and payload tags...");
        
        let localVote = "SAFE";
        let findings = [];
        const lcText = text.toLowerCase();
        
        if (lcText.includes("chase") || lcText.includes("paypal")) {
          findings.push("Alert: Unofficial relay server sending corporate mail envelope.");
          localVote = "SUSPICIOUS";
        } else {
          findings.push("Email SPF and DKIM signatures valid.");
        }
        
        done(localVote, `MetaAgent Output: ${findings.join(" ")}`);
      }
    }
  ];

  let currentIdx = 0;

  function runNextAgent() {
    if (currentIdx >= timeline.length) {
      // Swarm Completed - Rotate needle to final score
      setTimeout(() => {
        if (gaugeNeedle) {
          let rotateAngle = (score * 1.8) - 90; // Map 0-100 to -90 to +90
          gaugeNeedle.setAttribute("transform", `rotate(${rotateAngle} 60 65)`);
        }
        if (gaugeArc) {
          let dashOffset = 157 - (157 * score / 100);
          gaugeArc.style.strokeDashoffset = dashOffset;
        }
        if (consensusNum) {
          consensusNum.textContent = `${score}%`;
        }

        let consensusDecision = "SAFE AGREEMENT";
        if (score > 75) consensusDecision = "CRITICAL THREAT THRESHOLD";
        else if (score > 40) consensusDecision = "SUSPICIOUS THREAT VOTE";
        
        logAgentComms("meta", `Swarm completed consensus cycle: [${consensusDecision}]. Score: ${score}/100.`, "info");
        
        if (callback) callback();
      }, 500);
      return;
    }

    const stage = timeline[currentIdx];
    const key = stage.agent;

    // Trigger state changes
    if (cards[key]) cards[key].className = "orch-agent-card scanning";
    if (stateBadges[key]) stateBadges[key].textContent = "SCANNING";
    if (progressWraps[key]) progressWraps[key].classList.remove("hidden");
    if (progressLabels[key]) progressLabels[key].textContent = stage.scanLabel;

    // Timeline Node Activation
    if (dtSteps[key]) {
      const dot = dtSteps[key].querySelector(".orch-dt-dot");
      if (dot) dot.className = "orch-dt-dot active";
      if (dtActions[key]) dtActions[key].textContent = stage.scanLabel;
      if (dtTimes[key]) dtTimes[key].textContent = getTimestamp();
    }

    // Step 1: Scanning Animation
    let progress = 0;
    let interval = setInterval(() => {
      progress += 10;
      if (progressFills[key]) progressFills[key].style.width = `${progress}%`;
      
      if (progress === 40) {
        if (cards[key]) cards[key].className = "orch-agent-card processing";
        if (stateBadges[key]) stateBadges[key].textContent = "PROCESSING";
        if (progressLabels[key]) progressLabels[key].textContent = stage.procLabel;
        if (dtActions[key]) dtActions[key].textContent = stage.procLabel;
      }

      if (progress >= 100) {
        clearInterval(interval);
        
        // Execute logic callback
        stage.run((vote, findingsText) => {
          if (cards[key]) cards[key].className = "orch-agent-card completed";
          if (stateBadges[key]) stateBadges[key].textContent = "COMPLETED";
          if (progressLabels[key]) progressLabels[key].textContent = stage.compLabel;
          
          // Vote update
          if (votes[key]) {
            votes[key].textContent = vote;
            votes[key].className = `orch-vote-verdict ${vote.toLowerCase()}`;
          }

          // Timeline Step Completed
          if (dtSteps[key]) {
            const dot = dtSteps[key].querySelector(".orch-dt-dot");
            if (dot) dot.className = "orch-dt-dot completed";
            if (dtActions[key]) dtActions[key].textContent = "Completed Check";
            if (dtOutputs[key]) {
              dtOutputs[key].classList.remove("hidden");
              dtOutputs[key].textContent = findingsText;
            }
          }

          // Enable connector
          if (currentIdx < connectors.length) {
            connectors[currentIdx].className = "orch-dt-connector completed";
          }

          logAgentComms(key, `Analysis complete. Consensus status: [Voted ${vote}]`, "info");
          
          // Update gauge needle incrementally
          let intermediateScore = Math.round((score / timeline.length) * (currentIdx + 1));
          if (gaugeNeedle) {
            let rotateAngle = (intermediateScore * 1.8) - 90;
            gaugeNeedle.setAttribute("transform", `rotate(${rotateAngle} 60 65)`);
          }
          if (gaugeArc) {
            let dashOffset = 157 - (157 * intermediateScore / 100);
            gaugeArc.style.strokeDashoffset = dashOffset;
          }
          if (consensusNum) {
            consensusNum.textContent = `${intermediateScore}%`;
          }

          // Advance
          currentIdx++;
          setTimeout(runNextAgent, 600);
        });
      }
    }, 150);
  }

  // Start sequence
  runNextAgent();
}

function logAgentComms(source, msg, type = "info") {
  const container = document.getElementById("agent-console-logs");
  if (!container) return;

  const row = document.createElement("div");
  row.classList.add("console-log-row");

  const timeSpan = document.createElement("span");
  timeSpan.classList.add("log-timestamp");
  timeSpan.textContent = `[${getTimestamp()}]`;

  const sourceSpan = document.createElement("span");
  sourceSpan.classList.add("log-source", source);
  sourceSpan.textContent = source === "meta" && msg.includes("Orchestrator") ? "[ORCHESTRATOR]" : `[${capitalizeFirst(source)}Agent]`;

  const msgSpan = document.createElement("span");
  msgSpan.classList.add("log-message");
  if (type === "error") msgSpan.style.color = "var(--color-danger)";
  msgSpan.textContent = msg;

  row.appendChild(timeSpan);
  row.appendChild(sourceSpan);
  row.appendChild(msgSpan);

  container.appendChild(row);
  container.scrollTop = container.scrollHeight;
}

// Chart SVG Drawing Utility
function updateDashboardChartData() {
  const chartLine = document.getElementById("chart-line-path");
  const chartArea = document.getElementById("chart-area-path");
  const chartBtnScams = document.getElementById("btn-chart-scams");
  
  if (!chartLine) return;


  let yVal1, yVal2, yVal3, yVal4, yVal5;

  if (chartBtnScams.classList.contains("active")) {
    // Randomize scams metrics curves
    yVal1 = Math.floor(Math.random() * 40) + 140; // 140-180
    yVal2 = Math.floor(Math.random() * 40) + 110; // 110-150
    yVal3 = Math.floor(Math.random() * 50) + 70;  // 70-120
    yVal4 = Math.floor(Math.random() * 60) + 90;  // 90-150
    yVal5 = Math.floor(Math.random() * 50) + 30;  // 30-80
  } else {
    // Randomize CPU load curves
    yVal1 = Math.floor(Math.random() * 20) + 160;
    yVal2 = Math.floor(Math.random() * 30) + 120;
    yVal3 = Math.floor(Math.random() * 40) + 140;
    yVal4 = Math.floor(Math.random() * 50) + 110;
    yVal5 = Math.floor(Math.random() * 20) + 150;
  }

  const dPath = `M 0 ${yVal1} Q 75 ${yVal2} 150 ${yVal3} T 300 ${yVal4} T 450 ${yVal5} T 500 ${Math.floor(Math.random() * 50) + 40}`;
  chartLine.setAttribute("d", dPath);
  chartArea.setAttribute("d", `${dPath} L 500 200 L 0 200 Z`);
}

// Toggle charts tabs
document.addEventListener("DOMContentLoaded", () => {
  const btnScams = document.getElementById("btn-chart-scams");
  const btnLoad = document.getElementById("btn-chart-load");
  const chartArea = document.getElementById("chart-area-path");
  
  if (btnScams && btnLoad) {
    btnScams.addEventListener("click", () => {
      btnScams.classList.add("active");
      btnLoad.classList.remove("active");
      chartArea.setAttribute("fill", "url(#chart-gradient)");
      updateDashboardChartData();
    });
    btnLoad.addEventListener("click", () => {
      btnLoad.classList.add("active");
      btnScams.classList.remove("active");
      chartArea.setAttribute("fill", "url(#chart-gradient-purple)");
      updateDashboardChartData();
    });
  }
});

/* ==========================================
   3. QUICK THREAT SIMULATOR WIDGET (DASHBOARD)
   ========================================== */
function initializeScamSimulator() {
  const textArea = document.getElementById("sim-text-input");
  const agentSelect = document.getElementById("sim-agent-select");
  const runBtn = document.getElementById("run-sim-btn");
  const displayBox = document.getElementById("sim-result-display");
  const logEl = document.getElementById("sim-status-log");
  const scoreRow = document.getElementById("sim-score-row");
  const scoreVal = document.getElementById("sim-score-value");
  const ratingEl = document.getElementById("sim-risk-rating");
  const reasonEl = document.getElementById("sim-reason-text");

  runBtn.addEventListener("click", () => {
    const text = textArea.value.trim();
    if (!text) {
      alert("Please enter a test copy to simulate scanning!");
      return;
    }

    displayBox.style.display = "block";
    logEl.classList.remove("hidden");
    scoreRow.classList.add("hidden");
    logEl.textContent = "Connecting agent node channels...";

    setTimeout(() => {
      logEl.textContent = "Analyzing lexical markers & metadata bindings...";
      setTimeout(() => {
        logEl.classList.add("hidden");
        scoreRow.classList.remove("hidden");

        // Parse content to calculate fake risk score
        let riskScore = 0;
        let reasons = [];
        const lcText = text.toLowerCase();

        if (lcText.includes("urgent") || lcText.includes("immediately") || lcText.includes("24 hours") || lcText.includes("expire")) {
          riskScore += 35;
          reasons.push("PsyAgent: Detected high linguistic urgency pressure.");
        }
        if (lcText.includes("http") || lcText.includes(".xyz") || lcText.includes(".top") || lcText.includes("link") || lcText.includes("href")) {
          riskScore += 30;
          reasons.push("LinkAgent: Unverified hypertext domains in content.");
        }
        if (lcText.includes("bank") || lcText.includes("paypal") || lcText.includes("chase") || lcText.includes("refund") || lcText.includes("billing") || lcText.includes("compromised")) {
          riskScore += 25;
          reasons.push("PsyAgent: Brand authority spoofing markers.");
        }
        if (lcText.includes("crypto") || lcText.includes("airdrop") || lcText.includes("wallet") || lcText.includes("seed phrase") || lcText.includes("giveaway")) {
          riskScore += 30;
          reasons.push("MetaAgent: Cryptocurrency wallet credential lure detected.");
        }

        // Clamp risk score
        riskScore = Math.min(riskScore, 100);
        if (riskScore === 0) riskScore = Math.floor(Math.random() * 8) + 2; // minor ambient noise

        scoreVal.textContent = `${riskScore}%`;
        
        if (riskScore > 75) {
          ratingEl.textContent = "CRITICAL RISK";
          ratingEl.style.color = "var(--color-danger)";
          scoreVal.style.color = "var(--color-danger)";
          reasonEl.innerHTML = reasons.join("<br>");
        } else if (riskScore > 35) {
          ratingEl.textContent = "SUSPICIOUS";
          ratingEl.style.color = "var(--color-warning)";
          scoreVal.style.color = "var(--color-warning)";
          reasonEl.innerHTML = reasons.join("<br>");
        } else {
          ratingEl.textContent = "SAFE CORE";
          ratingEl.style.color = "var(--color-success)";
          scoreVal.style.color = "var(--color-success)";
          reasonEl.textContent = "No threats discovered during simulated audit.";
        }
      }, 1000);
    }, 800);
  });
}

/* ==========================================
   4. THREAT ANALYZER — FULL MULTI-AGENT SEQUENTIAL PIPELINE
   ========================================== */

// ─── Mock knowledge base for the 6-agent pipeline ───────────────────────────
const SCAM_KNOWLEDGE_BASE = {
  email: {
    phishing: {
      keywords: ["urgent", "verify", "click here", "confirm", "suspended", "compromised", "credentials", "account", "billing", "invoice"],
      tactics: ["Authority Impersonation", "Urgency Pressure", "Fear Engineering", "Brand Spoofing"],
      category: "Phishing & Credential Theft",
      education: "Email phishing attacks impersonate trusted organizations using lookalike sender addresses and urgent language to trick users into surrendering login credentials or financial details. Attackers often register domain typos (e.g. paypa1.com) and add official-looking logos to add false legitimacy.",
      recommendations: ["Do not click any links in the email.", "Verify the sender domain against the official website.", "Contact the organization via their official phone number.", "Report the email to your email provider as phishing.", "Change passwords for any accounts mentioned."]
    },
    benign: {
      category: "No Threat Detected",
      education: "The content analyzed does not exhibit known manipulation tactics or credential theft signatures. However, always remain vigilant with unsolicited emails.",
      recommendations: ["Continue monitoring for unusual follow-up messages.", "Verify senders for any future requests."]
    }
  },
  sms: {
    phishing: {
      keywords: ["usps", "fedex", "package", "fee", "unpaid", "click", "resolve", "verify", "prize", "winner", "bank"],
      tactics: ["Delivery Lure", "Fake Prize Notification", "Payment Urgency"],
      category: "SMS Smishing Attack",
      education: "Smishing (SMS phishing) uses text messages to deliver fraudulent links, often posing as postal services, banks, or prize notifications. These messages typically contain shortened URLs that redirect to credential-harvesting pages.",
      recommendations: ["Do not click links in unsolicited SMS messages.", "Go directly to the official website to track deliveries.", "Block and report the sender number.", "Forward suspicious texts to 7726 (SPAM) to report to your carrier."]
    }
  },
  im: {
    crypto: {
      keywords: ["btc", "bitcoin", "ethereum", "crypto", "wallet", "airdrop", "claim", "connect", "dapp", "seed phrase", "private key"],
      tactics: ["Cryptocurrency Lure", "FOMO Exploitation", "Wallet Drain via Smart Contract"],
      category: "Crypto Wallet Drain Scam",
      education: "Cryptocurrency scams in instant messaging platforms lure victims with fake airdrop or giveaway announcements. Connecting your wallet to malicious DApps can grant attackers smart contract permissions to drain all funds instantly.",
      recommendations: ["Never connect your wallet to unverified DApp links.", "Verify crypto announcements on official project channels only.", "Revoke wallet permissions regularly via tools like revoke.cash.", "Block and report the group or user."]
    }
  },
  dm: {
    lottery: {
      keywords: ["selected", "winner", "congratulations", "prize", "lottery", "fee", "transfer", "verification", "claim"],
      tactics: ["Lottery Fraud", "Advance Fee Deception", "Social Proof Manipulation"],
      category: "Social Media Lottery Scam",
      education: "Fake lottery and giveaway scams impersonate celebrities, brands, or government organizations on social media. They claim users have won prizes but require an upfront 'verification fee' — a classic advance-fee fraud technique.",
      recommendations: ["Block and report the sender profile immediately.", "Never pay any 'verification fees' for prize claims.", "Report the profile to the platform's trust & safety team.", "Inform contacts if a known account is compromised."]
    }
  },
  job: {
    advance_fee: {
      keywords: ["remote", "work from home", "no experience", "training fee", "equipment", "advance", "deposit", "easy money", "part time"],
      tactics: ["Fake Job Advance Fee", "Work-From-Home Lure", "Equipment Deposit Fraud"],
      category: "Fake Job Offer / Advance Fee Fraud",
      education: "Fake job scams target unemployed or underemployed individuals by offering suspiciously high salaries for minimal work. After initial contact, victims are asked to pay upfront fees for 'training kits', 'equipment deposits', or 'background checks' — money that is never recovered.",
      recommendations: ["Research the company name with 'scam' appended in search engines.", "Legitimate employers never ask for upfront payment.", "Verify job listings on official company websites.", "Report the offer to job board platforms and the FTC."]
    }
  },
  screenshot: {
    ocr_detected: {
      keywords: ["click", "link", "urgent", "verify"],
      tactics: ["Screenshot-based Phishing Delivery", "Image Obfuscation to Bypass Filters"],
      category: "Image-Embedded Phishing",
      education: "Attackers send screenshots or images of phishing messages to bypass text-based spam filters. These images contain fraudulent links or instructions intended to mislead users into revealing sensitive information.",
      recommendations: ["Treat urgent instructions in images with extreme skepticism.", "Manually type official website addresses — never trust URLs in images.", "Report the screenshot sender to the relevant platform.", "Enable advanced image-scanning features in your email security settings."]
    }
  }
};

function initializeThreatAnalyzer() {
  // ─── Tab button & frame arrays ───────────────────────────────────────────
  const tabBtns = {
    email:      document.getElementById("tab-btn-email"),
    sms:        document.getElementById("tab-btn-sms"),
    im:         document.getElementById("tab-btn-im"),
    dm:         document.getElementById("tab-btn-dm"),
    job:        document.getElementById("tab-btn-job"),
    screenshot: document.getElementById("tab-btn-screenshot")
  };
  const tabFrames = {
    email:      document.getElementById("analyzer-email-frame"),
    sms:        document.getElementById("analyzer-sms-frame"),
    im:         document.getElementById("analyzer-im-frame"),
    dm:         document.getElementById("analyzer-dm-frame"),
    job:        document.getElementById("analyzer-job-frame"),
    screenshot: document.getElementById("analyzer-screenshot-frame")
  };

  let activeTab = "email";

  // Tab switcher
  Object.entries(tabBtns).forEach(([key, btn]) => {
    if (!btn) return;
    btn.addEventListener("click", () => {
      Object.values(tabBtns).forEach(b => b && b.classList.remove("active"));
      Object.values(tabFrames).forEach(f => f && f.classList.add("hidden"));
      btn.classList.add("active");
      tabFrames[key].classList.remove("hidden");
      activeTab = key;
    });
  });

  // ─── Screenshot OCR Simulator ────────────────────────────────────────────
  const screenshotDropzone = document.getElementById("screenshot-dropzone");
  const screenshotInput    = document.getElementById("analyzer-screenshot-input");
  const ocrOutput          = document.getElementById("analyzer-ocr-output");
  const uploadText         = document.getElementById("screenshot-upload-text");

  const OCR_SIMULATED_TEXTS = [
    "URGENT: Your Chase account has been locked due to suspicious activity.\nClick to verify: http://chase-security-auth.xyz/verify\nFailure to respond within 24 hours will result in permanent suspension.",
    "Congratulations! You have been selected for a $1,000 Amazon Gift Card.\nClaim your prize now at: http://amazon-rewards-claim.top/gift\nThis offer expires in 2 hours. Act now!",
    "Hello,\nWe are processing your tax refund of $3,420.\nSubmit your bank details at: http://irs-refund-portal.net\nDeadline: 48 hours.",
    "USPS: Your package #987654 could not be delivered.\nUnpaid address confirmation fee: $2.99\nResolve here: http://usps-delivery-confirm.xyz"
  ];

  if (screenshotDropzone) {
    screenshotDropzone.addEventListener("click", () => screenshotInput && screenshotInput.click());
    screenshotDropzone.addEventListener("dragover", e => { e.preventDefault(); screenshotDropzone.style.borderColor = "var(--accent-cyan)"; });
    screenshotDropzone.addEventListener("dragleave", () => { screenshotDropzone.style.borderColor = "rgba(0, 240, 255, 0.2)"; });
    screenshotDropzone.addEventListener("drop", e => {
      e.preventDefault();
      screenshotDropzone.style.borderColor = "rgba(0, 240, 255, 0.2)";
      if (e.dataTransfer.files.length > 0) { handleScreenshotFile(e.dataTransfer.files[0]); }
    });
  }
  if (screenshotInput) {
    screenshotInput.addEventListener("change", e => { if (e.target.files.length > 0) handleScreenshotFile(e.target.files[0]); });
  }

  function handleScreenshotFile(file) {
    if (uploadText) uploadText.textContent = `Image loaded: ${file.name}`;
    if (ocrOutput) {
      ocrOutput.value = "[OCR Engine] Scanning image pixel layers...";
      setTimeout(() => {
        ocrOutput.value = "[OCR Engine] Extracting text regions...";
        setTimeout(() => {
          const extracted = OCR_SIMULATED_TEXTS[Math.floor(Math.random() * OCR_SIMULATED_TEXTS.length)];
          ocrOutput.value = extracted;
        }, 900);
      }, 700);
    }
  }

  // ─── Main Buttons ────────────────────────────────────────────────────────
  const startScanBtn = document.getElementById("start-scan-btn");
  const clearScanBtn = document.getElementById("clear-scan-btn");
  const reportBox    = document.getElementById("analyzer-report-box");

  if (clearScanBtn) {
    clearScanBtn.addEventListener("click", () => {
      ["analyzer-email-from","analyzer-email-subject","analyzer-email-body",
       "analyzer-sms-from","analyzer-sms-body",
       "analyzer-im-from","analyzer-im-body",
       "analyzer-dm-from","analyzer-dm-body",
       "analyzer-job-from","analyzer-job-body",
       "analyzer-ocr-output"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      if (uploadText)  uploadText.textContent = "Select / Drag and Drop screenshot image";
      if (reportBox)   reportBox.classList.add("hidden");
      resetAllTimelineSteps();
      resetJsonTraceConsole();
    });
  }

  if (startScanBtn) {
    startScanBtn.addEventListener("click", () => {
      const payload = gatherPayload(activeTab);
      if (!payload.body && activeTab !== "screenshot") {
        alert("Please fill in the message body before running the analysis.");
        return;
      }
      if (activeTab === "screenshot" && !ocrOutput.value.trim()) {
        alert("Please upload a screenshot image first so OCR can extract text.");
        return;
      }
      const textToAnalyze = activeTab === "screenshot" ? ocrOutput.value : payload.body;
      runAgentPipeline(activeTab, payload, textToAnalyze);
    });
  }

  // Collect form values into a structured payload object
  function gatherPayload(tab) {
    const g = id => (document.getElementById(id) || {}).value || "";
    switch(tab) {
      case "email":      return { from: g("analyzer-email-from"), subject: g("analyzer-email-subject"), body: g("analyzer-email-body"), source: "EMAIL" };
      case "sms":        return { from: g("analyzer-sms-from"),   body: g("analyzer-sms-body"),   source: "SMS" };
      case "im":         return { from: g("analyzer-im-from"),    body: g("analyzer-im-body"),    source: "IM_CHAT" };
      case "dm":         return { from: g("analyzer-dm-from"),    body: g("analyzer-dm-body"),    source: "SOCIAL_DM" };
      case "job":        return { from: g("analyzer-job-from"),   body: g("analyzer-job-body"),   source: "JOB_OFFER" };
      case "screenshot": return { body: g("analyzer-ocr-output"), source: "SCREENSHOT_OCR" };
      default:           return { body: "", source: "UNKNOWN" };
    }
  }

  // ─── 6-AGENT SEQUENTIAL PIPELINE ────────────────────────────────────────
  const STEP_IDS    = ["step-threat","step-psy","step-evidence","step-education","step-recommendation","step-report"];
  const STEP_DELAYS = [1100, 1300, 1200, 1400, 1200, 1000]; // ms each agent takes

  function resetAllTimelineSteps() {
    STEP_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.className = "timeline-step pending";
      el.querySelector(".step-num").classList.remove("hidden");
      el.querySelector(".step-spinner").classList.add("hidden");
      el.querySelector(".step-check").classList.add("hidden");
      el.querySelector(".step-status").textContent = "Awaiting...";
    });
  }

  function setStepActive(stepId, statusMsg) {
    const el = document.getElementById(stepId);
    if (!el) return;
    el.className = "timeline-step active";
    el.querySelector(".step-num").classList.add("hidden");
    el.querySelector(".step-spinner").classList.remove("hidden");
    el.querySelector(".step-check").classList.add("hidden");
    el.querySelector(".step-status").textContent = statusMsg;
    if (typeof lucide !== "undefined") lucide.createIcons();
  }

  function setStepDone(stepId, doneMsg) {
    const el = document.getElementById(stepId);
    if (!el) return;
    el.className = "timeline-step completed";
    el.querySelector(".step-num").classList.add("hidden");
    el.querySelector(".step-spinner").classList.add("hidden");
    el.querySelector(".step-check").classList.remove("hidden");
    el.querySelector(".step-status").textContent = doneMsg;
    if (typeof lucide !== "undefined") lucide.createIcons();
  }

  // ─── JSON Trace Console ──────────────────────────────────────────────────
  const jsonConsole = document.getElementById("json-trace-console");

  function resetJsonTraceConsole() {
    if (!jsonConsole) return;
    jsonConsole.innerHTML = `
      <div class="term-line system">// Multi-Agent JSON Communication Pipeline mounted.</div>
      <div class="term-line system">// Listening for structured data payloads...</div>
      <div class="term-line"><span class="term-cursor"></span></div>`;
  }

  function appendJsonBlock(agentName, jsonObj) {
    if (!jsonConsole) return;
    const cursor = jsonConsole.querySelector(".term-cursor");
    if (cursor && cursor.parentElement) cursor.parentElement.remove();

    const header = document.createElement("div");
    header.classList.add("term-line","info");
    header.textContent = `// [${getTimestamp()}] ${agentName} → output payload:`;
    jsonConsole.appendChild(header);

    const pre = document.createElement("div");
    pre.style.paddingLeft = "0.8rem";
    pre.style.borderLeft = "2px solid rgba(0,240,255,0.15)";
    pre.style.marginBottom = "6px";
    pre.innerHTML = syntaxHighlightJson(jsonObj);
    jsonConsole.appendChild(pre);

    const newCursor = document.createElement("div");
    newCursor.classList.add("term-line");
    newCursor.innerHTML = `<span class="term-cursor"></span>`;
    jsonConsole.appendChild(newCursor);
    jsonConsole.scrollTop = jsonConsole.scrollHeight;
  }

  function syntaxHighlightJson(obj) {
    const str = JSON.stringify(obj, null, 2);
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, match => {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          cls = /:$/.test(match) ? 'json-key' : 'json-string';
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      });
  }

  // ─── CONTENT ANALYSIS HELPERS ────────────────────────────────────────────
  function scoreText(text, tab) {
    const lc = text.toLowerCase();
    let score = 5;
    const kb = SCAM_KNOWLEDGE_BASE[tab];
    const variant = Object.values(kb)[0];
    const keywords = variant.keywords || [];
    keywords.forEach(kw => { if (lc.includes(kw.toLowerCase())) score += 12; });
    if (lc.includes("http") || lc.includes(".xyz") || lc.includes(".top") || lc.includes(".cc")) score += 20;
    if (lc.includes("urgent") || lc.includes("immediately") || lc.includes("24 hours")) score += 15;
    if (lc.includes("fee") || lc.includes("deposit") || lc.includes("transfer")) score += 18;
    return Math.min(score, 98);
  }

  function extractKeywords(text, tab) {
    const lc = text.toLowerCase();
    const kb = SCAM_KNOWLEDGE_BASE[tab];
    const variant = Object.values(kb)[0];
    const pool = (variant.keywords || []).concat(["urgent","verify","click","fee","free","winner","bank","password","login","account","http"]);
    return [...new Set(pool.filter(kw => lc.includes(kw.toLowerCase())))].slice(0, 8);
  }

  function extractEvidence(text, payload) {
    const evidence = [];
    const urlMatch = text.match(/https?:\/\/[^\s]+/gi);
    if (urlMatch) evidence.push({ type: "url", icon: "link", label: "Detected URL", value: urlMatch[0], severity: "danger" });
    const phoneMatch = text.match(/(\+?\d[\d\s\-().]{7,}\d)/);
    if (phoneMatch) evidence.push({ type: "phone", icon: "phone", label: "Phone / ID", value: phoneMatch[0].trim(), severity: "warning" });
    if (payload.from) evidence.push({ type: "sender", icon: "at-sign", label: "Sender Identity", value: payload.from, severity: "warning" });
    const amountMatch = text.match(/\$[\d,]+(\.\d{2})?/);
    if (amountMatch) evidence.push({ type: "amount", icon: "dollar-sign", label: "Financial Figure", value: amountMatch[0], severity: "danger" });
    const tldMatch = text.match(/\.(xyz|top|cc|ru|info|click|link)\b/i);
    if (tldMatch) evidence.push({ type: "tld", icon: "alert-octagon", label: "Suspicious TLD", value: tldMatch[0], severity: "danger" });
    return evidence;
  }

  function getTactics(tab, score) {
    const kb = SCAM_KNOWLEDGE_BASE[tab];
    const variant = Object.values(kb)[0];
    return score > 30 ? (variant.tactics || ["Unknown Manipulation Vector"]) : ["No Active Manipulation Detected"];
  }

  function getKnowledge(tab) {
    const kb = SCAM_KNOWLEDGE_BASE[tab];
    return Object.values(kb)[0];
  }

  // ─── PIPELINE RUNNER ─────────────────────────────────────────────────────
  function runAgentPipeline(tab, payload, text) {
    // Determine threat indicators for dashboard swarm visualization in parallel
    const score = scoreText(text, tab);
    const verdict = score > 75 ? "CRITICAL" : score > 45 ? "SUSPICIOUS" : "SAFE";
    
    // Trigger high-fidelity SOC dashboard swarm animations
    animateOrchestratorSwarm(text, score, verdict);

    if (isBackendLive) {
      runAgentPipelineReal(tab, payload, text);
    } else {
      runAgentPipelineMock(tab, payload, text);
    }
  }


  async function runAgentPipelineReal(tab, payload, text) {
    if (reportBox) reportBox.classList.add("hidden");
    resetAllTimelineSteps();
    resetJsonTraceConsole();

    try {
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source_type: payload.source,
          sender: payload.from || null,
          subject: payload.subject || null,
          body: text
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop(); // Keep remaining buffer

        let currentEvent = null;

        for (const line of lines) {
          const cleanLine = line.trim();
          if (cleanLine.startsWith("event:")) {
            currentEvent = cleanLine.substring(6).trim();
          } else if (cleanLine.startsWith("data:")) {
            const rawData = cleanLine.substring(5).trim();
            if (currentEvent && rawData) {
              const data = JSON.parse(rawData);
              
              if (currentEvent === "agent_start") {
                const agent = data.agent;
                const msg = data.message;
                if (agent === "ThreatAnalysisAgent") setStepActive("step-threat", msg);
                else if (agent === "PsychologyAgent") setStepActive("step-psy", msg);
                else if (agent === "EvidenceExtractionAgent") setStepActive("step-evidence", msg);
                else if (agent === "EducationAgent") setStepActive("step-education", msg);
                else if (agent === "RecommendationAgent") setStepActive("step-recommendation", msg);
                else if (agent === "ReportAgent") setStepActive("step-report", msg);
              } 
              else if (currentEvent === "agent_done") {
                const agent = data.agent;
                appendJsonBlock(agent, data);
                
                if (agent === "ThreatAnalysisAgent") {
                  setStepDone("step-threat", `Risk: ${data.risk_score}/100 — ${data.threat_level}`);
                } else if (agent === "PsychologyAgent") {
                  const tacticsCount = data.manipulation_tactics ? data.manipulation_tactics.length : 0;
                  setStepDone("step-psy", `${tacticsCount} tactic(s) mapped`);
                } else if (agent === "EvidenceExtractionAgent") {
                  const count = (data.urls?.length || 0) + (data.emails?.length || 0) + 
                                (data.phones?.length || 0) + (data.crypto_wallets?.length || 0) + 
                                (data.companies?.length || 0) + (data.persons?.length || 0);
                  setStepDone("step-evidence", `${count} item(s) extracted`);
                } else if (agent === "EducationAgent") {
                  setStepDone("step-education", "Scam taxonomy loaded");
                } else if (agent === "RecommendationAgent") {
                  const count = data.action_items ? data.action_items.length : 0;
                  setStepDone("step-recommendation", `${count} action(s) queued`);
                } else if (agent === "ReportAgent") {
                  setStepDone("step-report", "Report compiled — rendering UI");
                }
              }
              else if (currentEvent === "pipeline_complete") {
                // Synthesize the final report
                appendJsonBlock("ReportAgent [FINAL]", data.final_report);
                renderFullReportReal(data.final_report, payload.source);
              }
              else if (currentEvent === "error") {
                throw new Error(data.message || "Unknown pipeline error");
              }
            }
          } else if (cleanLine === "") {
            currentEvent = null;
          }
        }
      }
    } catch (err) {
      console.error("Live analysis pipeline failed, falling back to mock:", err);
      if (jsonConsole) {
        const row = document.createElement("div");
        row.classList.add("term-line", "system");
        row.style.color = "var(--color-warning)";
        row.textContent = `// [WARNING] Live pipeline error: ${err.message}. Falling back to MOCK mode...`;
        jsonConsole.appendChild(row);
      }
      runAgentPipelineMock(tab, payload, text);
    }
  }

  function renderFullReportReal(report, source) {
    if (!reportBox) return;
    reportBox.classList.remove("hidden");

    // Risk score dial
    const radialFill = document.getElementById("report-radial-fill");
    const scoreNum   = document.getElementById("report-score-num");
    const score = report.risk_score;
    if (radialFill && scoreNum) {
      scoreNum.textContent = score;
      const offset = 377 - (377 * score / 100);
      radialFill.style.strokeDashoffset = offset;
      radialFill.style.stroke = score > 75 ? "var(--color-danger)" : score > 45 ? "var(--color-warning)" : "var(--color-success)";
    }

    // Threat banner
    const banner = document.getElementById("report-danger-banner");
    if (banner) {
      if (score > 75) { banner.className = "report-threat-banner banner-high"; banner.textContent = `⚠ CRITICAL THREAT DETECTED (${report.final_verdict})`; }
      else if (score > 45) { banner.className = "report-threat-banner banner-med"; banner.textContent = `⚡ SUSPICIOUS ACTIVITY IDENTIFIED (${report.final_verdict})`; }
      else { banner.className = "report-threat-banner banner-low"; banner.textContent = `✓ LOW RISK — ENVIRONMENT SAFE (${report.final_verdict})`; }
    }

    // Render "Why?" reasons
    const whyBox = document.getElementById("report-threat-why-box");
    const whyList = document.getElementById("report-threat-why-list");
    if (whyBox && whyList) {
      if (score >= 45) {
        whyBox.classList.remove("hidden");
        const reasons = [];
        const ev = report.extracted_evidence || {};
        
        // 1. Newly registered domain
        const hasSuspiciousLink = (ev.urls && ev.urls.length > 0) || (ev.suspicious_keywords && ev.suspicious_keywords.some(kw => kw.includes("http") || kw.includes(".xyz") || kw.includes(".top") || kw.includes(".cc")));
        if (hasSuspiciousLink) {
          reasons.push("Newly registered domain / Suspicious TLD (.xyz, .top, .cc)");
        }
        
        // 2. Fake banking URL
        const textLower = (report.scam_category + " " + report.threat_summary + " " + (ev.suspicious_keywords ? ev.suspicious_keywords.join(" ") : "")).toLowerCase();
        const hasBankLure = textLower.includes("bank") || textLower.includes("paypal") || textLower.includes("chase") || textLower.includes("irs");
        if (hasBankLure && hasSuspiciousLink) {
          reasons.push("Fake banking URL spoofing brand authority");
        }
        
        // 3. Requests password
        const credentialsKeywords = ["verify", "credential", "password", "login", "card", "billing", "pin", "otp", "code", "account login"];
        const requestsCredentials = credentialsKeywords.some(kw => textLower.includes(kw));
        if (requestsCredentials) {
          reasons.push("Requests password, validation credentials, or account logs");
        }
        
        // 4. Uses urgency
        const urgencyKeywords = ["urgent", "immediately", "24 hours", "suspend", "locked", "expire", "action required"];
        const hasUrgency = urgencyKeywords.some(kw => textLower.includes(kw)) || report.manipulation_analysis.toLowerCase().includes("urgency") || report.manipulation_analysis.toLowerCase().includes("time pressure");
        if (hasUrgency) {
          reasons.push("Uses high-urgency threats to force immediate compliance");
        }
        
        // 5. Exceeded threshold
        if (score > 75) {
          reasons.push("Threat score exceeded critical threshold safety limits");
        }

        if (reasons.length === 0) {
          reasons.push("Contextual behavior matches threat intelligence fingerprints.");
        }

        whyList.innerHTML = reasons.map(r => `<li>${r}</li>`).join("");
      } else {
        whyBox.classList.add("hidden");
      }
    }

    // Category & Source badges
    const catEl = document.getElementById("report-scam-category");
    const srcEl = document.getElementById("report-threat-source");
    if (catEl) catEl.textContent = report.scam_category;
    if (srcEl) srcEl.textContent = source.replace("_"," ");

    // Manipulation tactics
    const tacticsList = document.getElementById("report-tactics-list");
    if (tacticsList) {
      tacticsList.innerHTML = report.manipulation_analysis ? `<p style="font-size:0.75rem;color:var(--text-secondary);line-height:1.3;margin-top:2px;">${report.manipulation_analysis}</p>` : "";
    }

    // Suspicious keywords
    const kwList = document.getElementById("report-keywords-list");
    if (kwList) {
      const keywords = report.extracted_evidence?.suspicious_keywords || [];
      if (keywords.length === 0) {
        kwList.innerHTML = `<span style="color:var(--text-muted);font-size:0.7rem;">None</span>`;
      } else {
        kwList.innerHTML = keywords.map(kw =>
          `<span style="background:rgba(255,183,0,0.08);border:1px solid rgba(255,183,0,0.3);color:var(--color-warning);padding:1px 6px;border-radius:3px;font-size:0.7rem;font-family:var(--font-mono)">${kw}</span>`
        ).join("");
      }
    }

    // Extracted evidence items
    const evList = document.getElementById("report-evidence-list");
    if (evList) {
      const ev = report.extracted_evidence || {};
      let itemsHtml = "";
      
      if (ev.urls && ev.urls.length > 0) {
        ev.urls.forEach(val => itemsHtml += `<div class="detail-item danger-text"><i data-lucide="link"></i><span><strong>URL:</strong> ${val}</span></div>`);
      }
      if (ev.emails && ev.emails.length > 0) {
        ev.emails.forEach(val => itemsHtml += `<div class="detail-item warning-text"><i data-lucide="mail"></i><span><strong>Email:</strong> ${val}</span></div>`);
      }
      if (ev.phones && ev.phones.length > 0) {
        ev.phones.forEach(val => itemsHtml += `<div class="detail-item warning-text"><i data-lucide="phone"></i><span><strong>Phone:</strong> ${val}</span></div>`);
      }
      if (ev.crypto_wallets && ev.crypto_wallets.length > 0) {
        ev.crypto_wallets.forEach(val => itemsHtml += `<div class="detail-item danger-text"><i data-lucide="wallet"></i><span><strong>Wallet:</strong> ${val}</span></div>`);
      }
      if (ev.companies && ev.companies.length > 0) {
        ev.companies.forEach(val => itemsHtml += `<div class="detail-item warning-text"><i data-lucide="building"></i><span><strong>Company:</strong> ${val}</span></div>`);
      }
      if (ev.persons && ev.persons.length > 0) {
        ev.persons.forEach(val => itemsHtml += `<div class="detail-item warning-text"><i data-lucide="user"></i><span><strong>Person:</strong> ${val}</span></div>`);
      }
      if (ev.qr_references && ev.qr_references.length > 0) {
        ev.qr_references.forEach(val => itemsHtml += `<div class="detail-item danger-text"><i data-lucide="qr-code"></i><span><strong>QR Ref:</strong> ${val}</span></div>`);
      }

      if (!itemsHtml) {
        evList.innerHTML = `<div class="detail-item success-text"><i data-lucide="check-circle"></i><span>No forensic artifacts extracted.</span></div>`;
      } else {
        evList.innerHTML = itemsHtml;
      }
    }

    // Educational explanation
    const eduEl = document.getElementById("report-education-explanation");
    if (eduEl) eduEl.textContent = report.educational_notes;

    // Recommendations checklist
    const recList = document.getElementById("report-recommendations-list");
    if (recList) {
      recList.innerHTML = report.recommendations.map(rec =>
        `<div style="display:flex;align-items:flex-start;gap:8px;font-size:0.75rem;color:var(--text-secondary);">
          <i data-lucide="chevron-right" style="width:12px;height:12px;color:var(--accent-cyan);flex-shrink:0;margin-top:2px;"></i>
          <span>${rec}</span>
        </div>`
      ).join("");
    }

    // Executive summary
    const summaryEl = document.getElementById("report-summary-text");
    if (summaryEl) {
      summaryEl.textContent = report.threat_summary;
    }

    if (typeof lucide !== "undefined") lucide.createIcons();
    reportBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function runAgentPipelineMock(tab, payload, text) {
    if (reportBox) reportBox.classList.add("hidden");
    resetAllTimelineSteps();
    resetJsonTraceConsole();

    // Shared context object passed between agents (JSON pipeline)
    const ctx = {
      session_id: `SS-${Date.now()}`,
      source_type: payload.source,
      raw_payload: { from: payload.from || null, subject: payload.subject || null, body: text.slice(0, 300) }
    };

    const score    = scoreText(text, tab);
    const keywords = extractKeywords(text, tab);
    const evidence = extractEvidence(text, payload);
    const tactics  = getTactics(tab, score);
    const kb       = getKnowledge(tab);

    // ── Agent 1: Threat Analysis Agent ──
    setStepActive("step-threat", "Classifying threat type and calculating risk score...");
    setTimeout(() => {
      ctx.stage1_threat_analysis = {
        agent: "ThreatAnalysisAgent",
        timestamp: getTimestamp(),
        risk_score: score,
        threat_level: score > 75 ? "CRITICAL" : score > 45 ? "HIGH" : score > 20 ? "MEDIUM" : "LOW",
        scam_category: kb.category,
        source_type: payload.source,
        confidence: (0.75 + Math.random() * 0.24).toFixed(2)
      };
      appendJsonBlock("ThreatAnalysisAgent", ctx.stage1_threat_analysis);
      setStepDone("step-threat", `Risk: ${score}/100 — ${ctx.stage1_threat_analysis.threat_level}`);

      // ── Agent 2: Psychology Agent ──
      setStepActive("step-psy", "Profiling psychological manipulation vectors...");
      setTimeout(() => {
        ctx.stage2_psychology = {
          agent: "PsychologyAgent",
          timestamp: getTimestamp(),
          manipulation_tactics: tactics,
          urgency_score: Math.min(score + 5, 100),
          fear_engineering: score > 50,
          authority_spoofing: text.toLowerCase().includes("bank") || text.toLowerCase().includes("irs") || text.toLowerCase().includes("paypal"),
          emotional_triggers: score > 60 ? ["fear_of_loss","time_pressure","financial_anxiety"] : ["mild_concern"]
        };
        appendJsonBlock("PsychologyAgent", ctx.stage2_psychology);
        setStepDone("step-psy", `${tactics.length} tactic(s) mapped`);

        // ── Agent 3: Evidence Extraction Agent ──
        setStepActive("step-evidence", "Extracting URLs, identifiers, and financial markers...");
        setTimeout(() => {
          ctx.stage3_evidence = {
            agent: "EvidenceExtractionAgent",
            timestamp: getTimestamp(),
            extracted_urls: evidence.filter(e => e.type === "url").map(e => e.value),
            extracted_phone_ids: evidence.filter(e => e.type === "phone").map(e => e.value),
            financial_figures: evidence.filter(e => e.type === "amount").map(e => e.value),
            suspicious_tlds: evidence.filter(e => e.type === "tld").map(e => e.value),
            suspicious_keywords: keywords,
            evidence_count: evidence.length
          };
          appendJsonBlock("EvidenceExtractionAgent", ctx.stage3_evidence);
          setStepDone("step-evidence", `${evidence.length} item(s) extracted`);

          // ── Agent 4: Education Agent ──
          setStepActive("step-education", "Generating educational context for threat class...");
          setTimeout(() => {
            ctx.stage4_education = {
              agent: "EducationAgent",
              timestamp: getTimestamp(),
              scam_class: kb.category,
              educational_summary: kb.education,
              similar_attack_vectors: [kb.category, "Brand Impersonation", "Social Engineering"],
              risk_awareness_rating: score > 70 ? "HIGH_PRIORITY_AWARENESS" : "STANDARD_AWARENESS"
            };
            appendJsonBlock("EducationAgent", ctx.stage4_education);
            setStepDone("step-education", "Scam taxonomy loaded");

            // ── Agent 5: Recommendation Agent ──
            setStepActive("step-recommendation", "Compiling mitigation action checklist...");
            setTimeout(() => {
              ctx.stage5_recommendations = {
                agent: "RecommendationAgent",
                timestamp: getTimestamp(),
                immediate_actions: kb.recommendations,
                report_to: ["Local cybercrime authority", "Platform trust & safety", "Anti-phishing working group (APWG)"],
                urgency: score > 70 ? "IMMEDIATE" : "STANDARD"
              };
              appendJsonBlock("RecommendationAgent", ctx.stage5_recommendations);
              setStepDone("step-recommendation", `${kb.recommendations.length} action(s) queued`);

              // ── Agent 6: Report Agent ──
              setStepActive("step-report", "Synthesizing final consensus intelligence report...");
              setTimeout(() => {
                ctx.stage6_report = {
                  agent: "ReportAgent",
                  timestamp: getTimestamp(),
                  session_id: ctx.session_id,
                  final_risk_score: score,
                  threat_verdict: ctx.stage1_threat_analysis.threat_level,
                  scam_category: kb.category,
                  source: payload.source,
                  top_keywords: keywords.slice(0, 5),
                  top_evidence_items: evidence.length,
                  primary_tactic: tactics[0] || "Unknown",
                  report_status: "COMPLETE",
                  pipeline_duration_ms: STEP_DELAYS.reduce((a,b) => a+b, 0)
                };
                appendJsonBlock("ReportAgent [FINAL]", ctx.stage6_report);
                setStepDone("step-report", "Report compiled — rendering UI");

                // Render the full report UI
                renderFullReport(score, kb, keywords, evidence, tactics, payload.source);

              }, STEP_DELAYS[5]);
            }, STEP_DELAYS[4]);
          }, STEP_DELAYS[3]);
        }, STEP_DELAYS[2]);
      }, STEP_DELAYS[1]);
    }, STEP_DELAYS[0]);
  }

  // ─── RENDER FULL REPORT ──────────────────────────────────────────────────
  function renderFullReport(score, kb, keywords, evidence, tactics, source) {
    if (!reportBox) return;
    reportBox.classList.remove("hidden");

    // Risk score dial
    const radialFill = document.getElementById("report-radial-fill");
    const scoreNum   = document.getElementById("report-score-num");
    if (radialFill && scoreNum) {
      scoreNum.textContent = score;
      const offset = 377 - (377 * score / 100);
      radialFill.style.strokeDashoffset = offset;
      radialFill.style.stroke = score > 75 ? "var(--color-danger)" : score > 45 ? "var(--color-warning)" : "var(--color-success)";
    }

    // Threat banner
    const banner = document.getElementById("report-danger-banner");
    if (banner) {
      if (score > 75) { banner.className = "report-threat-banner banner-high"; banner.textContent = "⚠ CRITICAL THREAT DETECTED"; }
      else if (score > 45) { banner.className = "report-threat-banner banner-med"; banner.textContent = "⚡ SUSPICIOUS ACTIVITY IDENTIFIED"; }
      else { banner.className = "report-threat-banner banner-low"; banner.textContent = "✓ LOW RISK — ENVIRONMENT SAFE"; }
    }

    // Render "Why?" reasons
    const whyBox = document.getElementById("report-threat-why-box");
    const whyList = document.getElementById("report-threat-why-list");
    if (whyBox && whyList) {
      if (score >= 45) {
        whyBox.classList.remove("hidden");
        const reasons = [];
        
        // 1. Newly registered domain
        const hasSuspiciousLink = evidence.some(ev => ev.type === "url" || ev.type === "tld" || (ev.value && ev.value.includes("http")));
        if (hasSuspiciousLink) {
          reasons.push("Newly registered domain / Suspicious TLD (.xyz, .top, .cc)");
        }
        
        // 2. Fake banking URL
        const textLower = (kb.category + " " + (keywords ? keywords.join(" ") : "")).toLowerCase();
        const hasBankLure = textLower.includes("bank") || textLower.includes("paypal") || textLower.includes("chase") || textLower.includes("irs");
        if (hasBankLure && hasSuspiciousLink) {
          reasons.push("Fake banking URL spoofing brand authority");
        }
        
        // 3. Requests password
        const credentialsKeywords = ["verify", "credential", "password", "login", "card", "billing", "pin", "otp", "code", "account login"];
        const requestsCredentials = credentialsKeywords.some(kw => textLower.includes(kw));
        if (requestsCredentials) {
          reasons.push("Requests password, validation credentials, or account logs");
        }
        
        // 4. Uses urgency
        const urgencyKeywords = ["urgent", "immediately", "24 hours", "suspend", "locked", "expire", "action required"];
        const hasUrgency = urgencyKeywords.some(kw => textLower.includes(kw)) || tactics.some(t => t.toLowerCase().includes("urgency") || t.toLowerCase().includes("time pressure"));
        if (hasUrgency) {
          reasons.push("Uses high-urgency threats to force immediate compliance");
        }
        
        // 5. Exceeded threshold
        if (score > 75) {
          reasons.push("Threat score exceeded critical threshold safety limits");
        }

        if (reasons.length === 0) {
          reasons.push("Contextual behavior matches threat intelligence fingerprints.");
        }

        whyList.innerHTML = reasons.map(r => `<li>${r}</li>`).join("");
      } else {
        whyBox.classList.add("hidden");
      }
    }

    // Category & Source badges
    const catEl = document.getElementById("report-scam-category");
    const srcEl = document.getElementById("report-threat-source");
    if (catEl) catEl.textContent = kb.category;
    if (srcEl) srcEl.textContent = source.replace("_"," ");

    // Manipulation tactics pills
    const tacticsList = document.getElementById("report-tactics-list");
    if (tacticsList) {
      tacticsList.innerHTML = tactics.map(t =>
        `<span style="background:rgba(255,0,85,0.08);border:1px solid rgba(255,0,85,0.3);color:var(--color-danger);padding:2px 8px;border-radius:4px;font-size:0.7rem;font-family:var(--font-cyber)">${t}</span>`
      ).join("");
    }

    // Suspicious keywords pills
    const kwList = document.getElementById("report-keywords-list");
    if (kwList) {
      kwList.innerHTML = keywords.map(kw =>
        `<span style="background:rgba(255,183,0,0.08);border:1px solid rgba(255,183,0,0.3);color:var(--color-warning);padding:1px 6px;border-radius:3px;font-size:0.7rem;font-family:var(--font-mono)">${kw}</span>`
      ).join("");
    }

    // Extracted evidence items
    const evList = document.getElementById("report-evidence-list");
    if (evList) {
      if (evidence.length === 0) {
        evList.innerHTML = `<div class="detail-item success-text"><i data-lucide="check-circle"></i><span>No suspicious artifacts extracted.</span></div>`;
      } else {
        evList.innerHTML = evidence.map(ev => {
          const cls = ev.severity === "danger" ? "danger-text" : "warning-text";
          const icon = ev.severity === "danger" ? "x-octagon" : "alert-triangle";
          return `<div class="detail-item ${cls}"><i data-lucide="${icon}"></i><span><strong>${ev.label}:</strong> ${ev.value}</span></div>`;
        }).join("");
      }
    }

    // Educational explanation
    const eduEl = document.getElementById("report-education-explanation");
    if (eduEl) eduEl.textContent = kb.education;

    // Recommendations checklist
    const recList = document.getElementById("report-recommendations-list");
    if (recList) {
      recList.innerHTML = kb.recommendations.map(rec =>
        `<div style="display:flex;align-items:flex-start;gap:8px;font-size:0.75rem;color:var(--text-secondary);">
          <i data-lucide="chevron-right" style="width:12px;height:12px;color:var(--accent-cyan);flex-shrink:0;margin-top:2px;"></i>
          <span>${rec}</span>
        </div>`
      ).join("");
    }

    // Executive summary
    const summaryEl = document.getElementById("report-summary-text");
    if (summaryEl) {
      const verdict = score > 75 ? "a high-confidence threat" : score > 45 ? "a suspicious communication" : "a low-risk communication";
      summaryEl.textContent = `The SocialShield AI consensus pipeline classified this ${source.toLowerCase().replace("_"," ")} as ${verdict} with a risk score of ${score}/100. The primary category is "${kb.category}". ${evidence.length} evidence artifact(s) were extracted and ${tactics.length} manipulation tactic(s) identified. Immediate review of the recommended actions is advised.`;
    }

    if (typeof lucide !== "undefined") lucide.createIcons();
    reportBox.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* ==========================================
   5. INTERACTIVE SCAM TRAINING QUIZ GAME
   ========================================== */
const quizQuestions = [
  {
    type: "Phishing Tactics",
    question: "You receive an email from 'billing-paypal-notification@secure-service.net' stating your account will be deleted in 24 hours due to suspicious behavior. It requests you to log in instantly. What is the primary indicator of a scam?",
    options: [
      "The sender's domain address is not the official PayPal.com.",
      "The email logo is slightly blurry and lacks color.",
      "The message requests urgency and account compliance."
    ],
    correctIdx: 0,
    explanation: "Incorrect sender domains are the strongest indicators of phishing. Legitimate corporate emails always utilize their primary owned domain paths."
  },
  {
    type: "Romance & Identity Scams",
    question: "An online acquaintance requests you to transfer funds using cryptocurrency gift cards because of an 'unexpected border customs emergency'. They refuse video validation calls due to 'broken device cameras'. What is the most logical triage?",
    options: [
      "Wait 48 hours for them to repair their device before assisting.",
      "Flags Romance Scam. Do not transfer funds. Cease communications.",
      "Purchase alternative cards to circumvent border rules."
    ],
    correctIdx: 1,
    explanation: "Emergency requests for money combined with structural excuses for not showing identity (no camera, no face-time) are primary romance scam indicators."
  },
  {
    type: "Deepfake Detection",
    question: "Which of the following artifact arrays indicates that an uploaded video response might be a synthetic GAN deepfake?",
    options: [
      "Low volume audio parameters with background wind noise.",
      "Glitches at facial boundaries, mismatched eye blinking, and metallic voice synthesis.",
      "Pixelated video blocks when playing over low band internet."
    ],
    correctIdx: 1,
    explanation: "Deepfakes often show visual boundary errors (smearing around chin/ears) and unnatural temporal features like zero or double-blinking eyes."
  }
];

let quizCurrentIndex = 0;
let quizScore = 0;

function initializeEducationQuiz() {
  const quizProgress = document.getElementById("quiz-progress-text");
  const quizScoreDisplay = document.getElementById("quiz-score-display");
  const questionType = document.getElementById("quiz-question-type");
  const questionText = document.getElementById("quiz-question-content");
  const optionsWrapper = document.getElementById("quiz-options-wrapper");
  const feedbackBox = document.getElementById("quiz-feedback-box");
  const nextBtn = document.getElementById("quiz-next-btn");

  function loadQuestion() {
    feedbackBox.style.display = "none";
    nextBtn.classList.add("hidden");
    
    const q = quizQuestions[quizCurrentIndex];
    quizProgress.textContent = `Scenario ${quizCurrentIndex + 1} of ${quizQuestions.length}`;
    questionType.textContent = q.type;
    questionText.textContent = q.question;
    
    optionsWrapper.innerHTML = "";
    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.classList.add("quiz-opt-btn");
      btn.setAttribute("data-opt", idx);
      
      const char = String.fromCharCode(65 + idx); // A, B, C...
      btn.innerHTML = `
        <span class="quiz-opt-marker">${char}</span>
        <span>${opt}</span>
      `;
      
      btn.addEventListener("click", () => handleOptionClick(idx, btn));
      optionsWrapper.appendChild(btn);
    });
  }

  function handleOptionClick(selectedIdx, clickedBtn) {
    const q = quizQuestions[quizCurrentIndex];
    const buttons = optionsWrapper.querySelectorAll(".quiz-opt-btn");
    
    // Disable all options
    buttons.forEach(btn => {
      btn.style.pointerEvents = "none";
      const idx = parseInt(btn.getAttribute("data-opt"));
      if (idx === q.correctIdx) {
        btn.classList.add("correct");
      }
    });

    if (selectedIdx === q.correctIdx) {
      quizScore += 100;
      quizScoreDisplay.textContent = `Score: ${quizScore}`;
      feedbackBox.className = "quiz-feedback-box correct";
      feedbackBox.textContent = `Correct! ${q.explanation}`;
    } else {
      clickedBtn.classList.add("incorrect");
      feedbackBox.className = "quiz-feedback-box incorrect";
      feedbackBox.textContent = `Alert: ${q.explanation}`;
    }
    
    feedbackBox.style.display = "block";
    nextBtn.classList.remove("hidden");
  }

  nextBtn.addEventListener("click", () => {
    quizCurrentIndex++;
    if (quizCurrentIndex < quizQuestions.length) {
      loadQuestion();
    } else {
      // Completed state
      quizProgress.textContent = "Finished Scenario Deck";
      questionType.textContent = "Evaluation Complete";
      questionText.textContent = `Defensive perimeter test completed! Final score: ${quizScore} / ${quizQuestions.length * 100}`;
      optionsWrapper.innerHTML = "";
      feedbackBox.style.display = "none";
      
      nextBtn.textContent = "Restart Training Deck";
      nextBtn.classList.remove("hidden");
      
      // Reset
      quizCurrentIndex = -1;
      quizScore = 0;
      quizScoreDisplay.textContent = "Score: 0";
    }
  });

  // Initial load
  loadQuestion();
}

/* ==========================================
   6. SVG ARCHITECTURE & CONSENSUS INTERACTION (ABOUT)
   ========================================== */
function initializeArchitectureSVG() {
  const nodes = ["psy", "link", "dfake", "meta"];
  
  nodes.forEach(name => {
    const circle = document.getElementById(`node-${name}`);
    const link = document.getElementById(`link-c${nodes.indexOf(name) + 1}`);
    const labels = document.querySelectorAll(".arch-node-label");
    
    if (circle) {
      circle.addEventListener("mouseenter", () => {
        circle.style.stroke = "var(--accent-cyan)";
        circle.style.r = "15";
        if (link) {
          link.classList.add("active");
          link.style.strokeWidth = "2.5";
        }
        // highlight labels
        labels.forEach(lbl => {
          if (lbl.textContent.includes(name.toUpperCase())) {
            lbl.classList.add("active");
          }
        });
      });

      circle.addEventListener("mouseleave", () => {
        circle.style.stroke = "var(--accent-purple)";
        circle.style.r = "12";
        if (link) {
          link.classList.remove("active");
          link.style.strokeWidth = "1.5";
        }
        labels.forEach(lbl => lbl.classList.remove("active"));
      });
    }
  });
}

/* ==========================================
   HELPERS & UTILS
   ========================================== */
function getTimestamp() {
  const now = new Date();
  return now.toTimeString().split(" ")[0];
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
