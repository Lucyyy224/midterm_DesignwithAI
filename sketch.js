let state = "home";
let selectedOffice = "";
let selectedRole = "";
let selectedTask = "";

let officeImages = {};
let roleImages = {};

let offices = {
  "Usability Testing Office": {
    roles: ["Usability Tester"],
    tasks: ["Usability Testing & Heatmaps", "Accessibility Testing", "Sentiment Analysis on User Feedback", "Interaction Path Optimization"]
  },
  "UI Design Office": {
    roles: ["UI Designer"],
    tasks: ["AI-Generated UI Components", "Color & Typography Suggestions", "Smart Interface Optimization", "Design Resource Management"]
  },
  "Research Lab": {
    roles: ["Researcher"],
    tasks: ["User Data Analysis", "User Research & Interview Analysis", "Competitor Analysis", "Demand Prediction"]
  },
  "UX Design Office": {
    roles: ["General UX Designer", "Conversational Designer", "Personalization Designer"],
    tasks: {
      "General UX Designer": ["Interaction Design", "User Journey Mapping", "Usability Testing", "Design System Management"],
      "Conversational Designer": ["AI Voice Assistant Design", "Intent Recognition & NLP Training", "Multi-Turn Conversation Design", "Speech & Text Analysis"],
      "Personalization Designer": ["Personalized Recommendation System", "Predictive User Analytics", "User Segmentation", "A/B Testing Optimization"]
    }
  }
};


function preload() {
  // 加载 Office 图像
  officeImages["Usability Testing Office"] = loadImage("usability_testing_office.png");
  officeImages["UI Design Office"] = loadImage("ui_design_office.png");
  officeImages["Research Lab"] = loadImage("research_lab.png");
  officeImages["UX Design Office"] = loadImage("ux_design_office.png");

  // 加载 Role 图像
  roleImages["Usability Tester"] = loadImage("usability_tester.png");
  roleImages["UI Designer"] = loadImage("ui_designer.png");
  roleImages["Researcher"] = loadImage("researcher.png");
  roleImages["General UX Designer"] = loadImage("general_ux_designer.png");
  roleImages["Conversational Designer"] = loadImage("conversational_designer.png");
  roleImages["Personalization Designer"] = loadImage("personalization_designer.png");
}

let aiTools = {
  "Usability Testing & Heatmaps": {
    tools: ["Hotjar", "UsabilityHub", "Lookback.io"],
    reason: "Tracks and visualizes user behavior, detecting UI issues efficiently."
  },
  "Accessibility Testing": {
    tools: ["WAVE", "EqualWeb", "Microsoft Accessibility Insights"],
    reason: "Scans UI for accessibility issues such as color contrast and screen reader compatibility."
  },
  "Sentiment Analysis on User Feedback": {
    tools: ["MonkeyLearn", "Lexalytics"],
    reason: "Classifies feedback into emotional tones for fast analysis."
  },
  "Interaction Path Optimization": {
    tools: ["Google Optimize", "Dynamic Yield"],
    reason: "AI provides real-time path optimization based on user data."
  },
  "AI-Generated UI Components": {
    tools: ["Galileo AI", "Figma AI Plugin", "Uizard"],
    reason: "Generates UI elements from text prompts to accelerate ideation."
  },
  "Color & Typography Suggestions": {
    tools: ["Khroma", "Adobe Sensei"],
    reason: "AI suggests visual styles aligned with brand identity."
  },
  "Smart Interface Optimization": {
    tools: ["Google Optimize", "Dynamic Yield"],
    reason: "Provides optimization suggestions based on live A/B testing."
  },
  "Design Resource Management": {
    tools: ["Fronty", "Remove.bg", "Icons8 AI"],
    reason: "Helps manage visual assets quickly with automated tools."
  },
  "User Data Analysis": {
    tools: ["Google Analytics", "Hotjar", "PlaybookUX"],
    reason: "Analyzes large datasets, detects user patterns, generates insights."
  },
  "User Research & Interview Analysis": {
    tools: ["ChatGPT", "Otter.ai", "Deepgram"],
    reason: "Summarizes user interviews and extracts key themes automatically."
  },
  "Competitor Analysis": {
    tools: ["Crayon", "Similarweb", "Deepset AI"],
    reason: "Analyzes competitor content and summarizes market positioning."
  },
  "Demand Prediction": {
    tools: ["Google Cloud AI", "Forecast Forge"],
    reason: "Forecasts product demand using historical and real-time data."
  },
  "Interaction Design": {
    tools: ["Uizard", "Galileo AI"],
    reason: "Rapidly generates interaction wireframes from text input."
  },
  "User Journey Mapping": {
    tools: ["UXPressia", "Smaply", "Miro AI plugins"],
    reason: "AI helps map user behavior patterns and journey stages."
  },
  "Design System Management": {
    tools: ["Lona by Airbnb", "Specify", "Supernova"],
    reason: "AI assists in organizing and maintaining scalable design systems."
  },
  "AI Voice Assistant Design": {
    tools: ["Voiceflow", "Botpress", "Dialogflow"],
    reason: "Designs and tests voice assistants with natural language understanding."
  },
  "Intent Recognition & NLP Training": {
    tools: ["Rasa NLU", "Google Dialogflow"],
    reason: "Trains models to recognize user intentions and respond accordingly."
  },
  "Multi-Turn Conversation Design": {
    tools: ["ChatGPT", "Botmock", "Landbot"],
    reason: "AI helps simulate and optimize multi-step conversation flow."
  },
  "Speech & Text Analysis": {
    tools: ["Whisper", "Deepgram", "Speechmatics"],
    reason: "Extracts meaning, sentiment, or actions from user speech."
  },
  "Personalized Recommendation System": {
    tools: ["Amazon Personalize", "Google Recommendations AI"],
    reason: "Recommends content based on user behavior and preferences."
  },
  "Predictive User Analytics": {
    tools: ["Heap", "Mixpanel", "Amplitude"],
    reason: "Predicts user churn, conversion, and behavior trends."
  },
  "User Segmentation": {
    tools: ["Segment", "Optimizely", "Customer.io"],
    reason: "AI clusters users based on characteristics for tailored strategies."
  },
  "A/B Testing Optimization": {
    tools: ["Google Optimize", "VWO", "Optimizely"],
    reason: "AI enhances A/B testing with better targeting and results."
  }
};

const toolLinks = {
  "Hotjar": "https://www.hotjar.com/",
  "UsabilityHub": "https://usabilityhub.com/",
  "Lookback.io": "https://lookback.io/",
  "WAVE": "https://wave.webaim.org/",
  "EqualWeb": "https://www.equalweb.com/",
  "Microsoft Accessibility Insights": "https://accessibilityinsights.io/",
  "MonkeyLearn": "https://monkeylearn.com/",
  "Lexalytics": "https://www.lexalytics.com/",
  "Google Optimize": "https://marketingplatform.google.com/about/optimize/",
  "Dynamic Yield": "https://www.dynamicyield.com/",
  "Galileo AI": "https://www.usegalileo.ai/",
  "Figma AI Plugin": "https://www.figma.com/community/search?resource_type=plugin&sort_by=popular&query=ai",
  "Uizard": "https://uizard.io/",
  "Khroma": "http://khroma.co/",
  "Adobe Sensei": "https://www.adobe.com/sensei.html",
  "Fronty": "https://fronty.com/",
  "Remove.bg": "https://www.remove.bg/",
  "Icons8 AI": "https://icons8.com/ai",
  "Google Analytics": "https://analytics.google.com/",
  "PlaybookUX": "https://www.playbookux.com/",
  "ChatGPT": "https://chat.openai.com/",
  "Deepgram": "https://deepgram.com/",
  "Otter.ai": "https://otter.ai/",
  "Deepspek AI": "https://www.deepspek.com/",
  "Crayon": "https://www.crayon.co/",
  
  "VWO":"https://vwo.com/",
  "Optimizely":"https://www.optimizely.com/",
  "Segment":"https://segment.com/",
  "Customer.io":"https://customer.io/",
  "Heap":"https://heap.io/",
  "Amplitude":"https://www.amplitude.com/",
  "Mixpanel":"https://www.mixpanel.com/",
  "Amazon Personalize":"https://aws.amazon.com/ai/generative-ai/use-cases/personalization/",
  "Google Recommendations AI":"https://cloud.google.com/use-cases/recommendations",
  "Lona by Airbnb":"https://pitchwall.co/startup/lona-by-airbnb",
  "Specify":"https://specified.ai/",
  "Supernova":"https://www.supernova.io/",
  "Similarweb":"https://www.similarweb.com/",
  "Deepset AI":"https://www.deepset.ai/",
  "UXPressia":"https://uxpressia.com/",
  "Samply":"https://www.samply.io/",
  "Miro AI plugins" :"https://www.miro.com/",
};



function setup() {
  createCanvas(800, 600);
  textFont("Georgia");
}

function draw() {
  background('#9BCCD0');
  if (state === "home") drawHome();
  else if (state === "chooseOffice") drawChooseOffice();
  else if (state === "office") drawOffice();
  else if (state === "tasks") drawTasks();
  else if (state === "taskDetail") drawTaskDetail();
}

// 文字按钮（START, BACK, Tasks使用）
function drawTextButton(label, x, y) {
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(mouseIsOver(x, y, label) ? '#E22028' : 0);
  text(label, x, y);
}

// 判断鼠标是否在文字按钮上
function mouseIsOver(x, y, label) {
  let tw = textWidth(label || "Sample") + 20;
  return mouseX > x - tw / 2 && mouseX < x + tw / 2 && mouseY > y - 15 && mouseY < y + 15;
}

// 图片按钮（用于 Office 和 Role）
function drawImageButton(label, img, x, y, w = 120, h = 80) {
  imageMode(CENTER);
  image(img, x, y, w, h);
  textAlign(CENTER, TOP);
  textSize(14);
  fill(mouseIsOverImage(x, y, w, h) ? '#E22028' : 0);
  text(label, x, y + h / 2 + 5);
}

// 判断鼠标是否在图片按钮上
function mouseIsOverImage(x, y, w, h) {
  return mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - h / 2 && mouseY < y + h / 2;
}

// 首页
function drawHome() {
  textAlign(CENTER, CENTER);
  textSize(40);
  fill('#E22028');
  text("INDUSTRY GUIDE TO CREATIVE AI", width / 2, height / 3);
  textSize(18);
  text("by Ruoqing Zhang", width / 2, height / 2.5);
  drawTextButton("START", width / 2, height / 2 + 60);
}

// Office 选择页面（图片按钮）
function drawChooseOffice() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill('#E22028');
  text("CHOOSE AN OFFICE", width / 2, 50);

  let officesList = Object.keys(officeImages);
  for (let i = 0; i < officesList.length; i++) {
    let x = 160 + i * 180;
    drawImageButton(officesList[i], officeImages[officesList[i]], x, 200);
  }

  drawTextButton("BACK", width / 2, height - 40);
}

// 职位选择页面（图片按钮）
function drawOffice() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill('#E22028');
  text(selectedOffice.toUpperCase(), width / 2, 50);

  let roles = selectedOffice === "UX Design Office"
    ? Object.keys(roleImages).filter(r => r.includes("Designer") && r !== "UI Designer")
    : offices[selectedOffice].roles;

  for (let i = 0; i < roles.length; i++) {
    let x = 160 + i * 180;
    drawImageButton(roles[i], roleImages[roles[i]], x, 200);
  }

  drawTextButton("BACK", width / 2, height - 40);
}

// 任务页面（文字按钮）
function drawTasks() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill('#E22028');
  text("Your Tasks as " + selectedRole, width / 2, 60);

  let tasks = selectedOffice === "UX Design Office"
    ? offices[selectedOffice].tasks[selectedRole]
    : offices[selectedOffice].tasks;

  let y = 140;
  for (let i = 0; i < tasks.length; i++) {
    drawTextButton(tasks[i], width / 2, y + i * 50);
  }

  drawTextButton("BACK", width / 2, height - 40);
}

// AI 工具推荐详情
function drawTaskDetail() {
  background('#9BCCD0');
  textAlign(CENTER, CENTER);
  fill('#E22028');

  textSize(28);
  text("Recommended AI Tools for:", width / 2, 50);

  textSize(20);
  text(selectedTask, width / 2, 90);

  let toolData = aiTools[selectedTask];
  if (toolData) {
    let y = 140;

    for (let i = 0; i < toolData.tools.length; i++) {
      let tool = toolData.tools[i];
      let link = toolLinks[tool] || "#";

      // 显示为可点击的超链接样式
      fill(0, 102, 204);
      textSize(16);
      text(tool, width / 2, y);

      // 如果鼠标悬停在文字上，显示小手图标
      if (mouseX > width / 2 - textWidth(tool) / 2 && mouseX < width / 2 + textWidth(tool) / 2 &&
          mouseY > y - 10 && mouseY < y + 10) {
        cursor(HAND);
      }

      y += 30;
    }

    // Why 段落 — 居中且限定宽度
fill(0);
textSize(16);
textAlign(LEFT, TOP); // 用 LEFT 对齐才能让段落排版正确
let boxWidth = 800;
let boxX = 200;
let boxY = y + 20;
text("Why: " + toolData.reason, boxX, boxY, boxWidth, 200);

  } else {
    textSize(16);
    text("No AI tools listed yet for this task.", width / 2, 150);
  }

  // 返回按钮
  textAlign(CENTER, CENTER);
  drawTextButton("BACK", width / 2, height - 60);
}

// 鼠标交互逻辑
function mouseReleased() {
  if (state === "home" && mouseIsOver(width / 2, height / 2 + 60, "START")) {
    state = "chooseOffice";
  }

  if (state === "chooseOffice") {
    let officesList = Object.keys(officeImages);
    for (let i = 0; i < officesList.length; i++) {
      let x = 160 + i * 180;
      if (mouseIsOverImage(x, 200, 120, 80)) {
        selectedOffice = officesList[i];
        state = "office";
        return;
      }
    }
    if (mouseIsOver(width / 2, height - 40, "BACK")) {
      state = "home";
    }
  }

  if (state === "office") {
    let roles = selectedOffice === "UX Design Office"
      ? Object.keys(roleImages).filter(r => r.includes("Designer") && r !== "UI Designer")
      : offices[selectedOffice].roles;

    for (let i = 0; i < roles.length; i++) {
      let x = 160 + i * 180;
      if (mouseIsOverImage(x, 200, 120, 80)) {
        selectedRole = roles[i];
        state = "tasks";
        return;
      }
    }
    if (mouseIsOver(width / 2, height - 40, "BACK")) {
      state = "chooseOffice";
    }
  }

  if (state === "tasks") {
    let tasks = selectedOffice === "UX Design Office"
      ? offices[selectedOffice].tasks[selectedRole]
      : offices[selectedOffice].tasks;

    let y = 140;
    for (let i = 0; i < tasks.length; i++) {
      if (mouseIsOver(width / 2, y + i * 50, tasks[i])) {
        selectedTask = tasks[i];
        state = "taskDetail";
        return;
      }
    }

    if (mouseIsOver(width / 2, height - 40, "BACK")) {
      state = "office";
    }
  }
  
  if (state === "taskDetail") {
  let toolData = aiTools[selectedTask];
  if (toolData) {
    let y = 140;
    for (let i = 0; i < toolData.tools.length; i++) {
      let tool = toolData.tools[i];
      let textW = textWidth(tool);
      if (
        mouseX > width / 2 - textW / 2 &&
        mouseX < width / 2 + textW / 2 &&
        mouseY > y - 10 &&
        mouseY < y + 10
      ) {
        let url = toolLinks[tool];
        if (url) {
          window.open(url, "_blank"); // 打开新标签页
        }
        return; // 防止继续执行下面的 BACK 判断
      }
      y += 30;
    }
  }

  // BACK 按钮判断（保持不变）
  if (mouseIsOver(width / 2, height - 60, "BACK")) {
    state = "tasks";
  }
}


  if (state === "taskDetail") {
    if (mouseIsOver(width / 2, height - 40, "BACK")) {
      state = "tasks";
    }
  }
}