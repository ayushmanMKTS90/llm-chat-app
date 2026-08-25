import { BoxRenderable, TextRenderable, createCliRenderer } from "@opentui/core"

const renderer = await createCliRenderer({
  exitOnCtrlC: true,
  backgroundColor: "#1A1A2E",
})

const header = new BoxRenderable(renderer, {
  flexDirection: "row",
  height: 1,
  backgroundColor: "#1A1A2E",
  borderStyle: "single",
  borderColor: "#333333",
  paddingLeft: 1,
  paddingRight: 1,
  alignItems: "center",
})

const titleText = new TextRenderable(renderer, {
  content: "PM AI Terminal v1.0",
  fg: "#00FFFF",
  attributes: 1,
})

const quitText = new TextRenderable(renderer, {
  content: "[Q] Quit",
  fg: "#666666",
})

header.add(titleText)
header.add(new BoxRenderable(renderer, { flexGrow: 1 })) // spacer
header.add(quitText)

const content = new BoxRenderable(renderer, {
  flexDirection: "column",
  width: "100%",
  height: "100%",
  padding: 1,
  gap: 1,
})

const dashboardTitle = new TextRenderable(renderer, {
  content: "📊 PM AI TERMINAL  Terminal as a Service • AI Era Project Manager",
  fg: "#00FFFF",
  attributes: 1,
})

const sprintText = new TextRenderable(renderer, {
  content: "Active Sprint: Sprint 23 - AI Integration",
  fg: "#FFAA00",
  attributes: 1,
})

const metricRow = new BoxRenderable(renderer, {
  flexDirection: "row",
  gap: 2,
})

// Metric 1
const m1 = new BoxRenderable(renderer, {
  borderStyle: "rounded",
  borderColor: "#00AAFF",
  backgroundColor: "#1A1A2E",
  padding: 1,
  width: "25%",
  flexDirection: "column",
  justifyContent: "space-between",
})
m1.add(new TextRenderable(renderer, { content: "Sprint Progress", fg: "#888888" }))
m1.add(new TextRenderable(renderer, { content: "49%", fg: "#FFFFFF", attributes: 1 }))
m1.add(new TextRenderable(renderer, { content: "▲ +42/85 pts", fg: "#00FF00" }))
m1.add(new BoxRenderable(renderer, { height: 1, backgroundColor: "#00AAFF", width: "30%" }))

// Metric 2
const m2 = new BoxRenderable(renderer, {
  borderStyle: "rounded",
  borderColor: "#FFAA00",
  backgroundColor: "#1A1A2E",
  padding: 1,
  width: "25%",
  flexDirection: "column",
  justifyContent: "space-between",
})
m2.add(new TextRenderable(renderer, { content: "AI Cost (Month)", fg: "#888888" }))
m2.add(new TextRenderable(renderer, { content: "$1,247.83", fg: "#FFFFFF", attributes: 1 }))
m2.add(new TextRenderable(renderer, { content: "▼ +$47.23/day", fg: "#FF0000" }))
m2.add(new BoxRenderable(renderer, { height: 1, backgroundColor: "#FFAA00", width: "30%" }))

// Metric 3
const m3 = new BoxRenderable(renderer, {
  borderStyle: "rounded",
  borderColor: "#00FF00",
  backgroundColor: "#1A1A2E",
  padding: 1,
  width: "25%",
  flexDirection: "column",
  justifyContent: "space-between",
})
m3.add(new TextRenderable(renderer, { content: "Team Velocity", fg: "#888888" }))
m3.add(new TextRenderable(renderer, { content: "38 pts", fg: "#FFFFFF", attributes: 1 }))
m3.add(new TextRenderable(renderer, { content: "▲ Team: 38 pts/sprint", fg: "#00FF00" }))
m3.add(new BoxRenderable(renderer, { height: 1, backgroundColor: "#00FF00", width: "30%" }))

// Metric 4
const m4 = new BoxRenderable(renderer, {
  borderStyle: "rounded",
  borderColor: "#AA00FF",
  backgroundColor: "#1A1A2E",
  padding: 1,
  width: "25%",
  flexDirection: "column",
  justifyContent: "space-between",
})
m4.add(new TextRenderable(renderer, { content: "AI Adoption", fg: "#888888" }))
m4.add(new TextRenderable(renderer, { content: "67%", fg: "#FFFFFF", attributes: 1 }))
m4.add(new TextRenderable(renderer, { content: "▲ 67% AI-assisted", fg: "#AA00FF" }))
m4.add(new BoxRenderable(renderer, { height: 1, backgroundColor: "#AA00FF", width: "30%" }))

metricRow.add(m1)
metricRow.add(m2)
metricRow.add(m3)
metricRow.add(m4)

content.add(dashboardTitle)
content.add(sprintText)
content.add(new BoxRenderable(renderer, { height: 1, backgroundColor: "#444444" }))
content.add(metricRow)

renderer.root.add(header)
renderer.root.add(content)

renderer.addInputHandler((sequence) => {
  if (sequence === 'q' || sequence === '\x03') {
    renderer.destroy()
    process.exit(0)
    return true
  }
  return false
})