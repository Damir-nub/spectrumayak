#!/usr/bin/env node

/**
 * Test script for Playwright MCP server
 * Opens google.com and takes a screenshot
 */

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const MCP_SERVER_PATH = path.join(
  __dirname,
  "../node_modules/playwright-mcp-tabbed/dist/index.js",
);
const SCREENSHOT_PATH = path.join(__dirname, "google-test-screenshot.png");

let requestId = 1;

function sendRequest(process, method, params = {}) {
  return new Promise((resolve, reject) => {
    const request = {
      jsonrpc: "2.0",
      id: requestId++,
      method,
      params,
    };

    const timeout = setTimeout(() => {
      reject(new Error(`Request timeout: ${method}`));
    }, 30000);

    let response = "";
    const listener = (data) => {
      response += data.toString();
      try {
        const json = JSON.parse(response);
        clearTimeout(timeout);
        process.stdout.off("data", listener);
        if (json.error) {
          reject(new Error(`MCP Error: ${JSON.stringify(json.error)}`));
        } else {
          resolve(json.result);
        }
      } catch (e) {
        // Not complete JSON yet, wait for more data
      }
    };

    process.stdout.on("data", listener);
    process.stdin.write(JSON.stringify(request) + "\n");
  });
}

async function main() {
  console.log("🚀 Starting Playwright MCP server...");

  const mcp = spawn("node", [MCP_SERVER_PATH], {
    env: {
      ...process.env,
      PLAYWRIGHT_MCP_RECORD_VIDEO_DIR: path.join(
        __dirname,
        "playwright-recordings",
      ),
    },
  });

  mcp.on("error", (err) => {
    console.error("❌ Failed to start MCP server:", err);
    process.exit(1);
  });

  // Wait for server to start
  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    console.log("📋 Initializing MCP connection...");
    await sendRequest(mcp, "initialize", {
      protocolVersion: "2024-11-05",
      capabilities: { roots: { listChanged: true }, sampling: {} },
      clientInfo: { name: "test-script", version: "1.0" },
    });

    console.log("🌐 Creating new browser tab...");
    const tabsResult = await sendRequest(mcp, "tools/call", {
      name: "browser_tabs",
      arguments: { action: "new" },
    });
    console.log("✅ Tab created:", tabsResult.content[0].text);

    console.log("🔗 Navigating to google.com...");
    const navResult = await sendRequest(mcp, "tools/call", {
      name: "browser_navigate",
      arguments: {
        url: "https://www.google.com",
        wait_until: "load",
        timeout: 30000,
      },
    });
    console.log(
      "✅ Navigation result:",
      navResult.content[0].text.substring(0, 200),
    );

    console.log("⏳ Waiting for page to load...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("📸 Taking screenshot...");
    const screenshotResult = await sendRequest(mcp, "tools/call", {
      name: "browser_take_screenshot",
      arguments: { full_page: false },
    });

    const base64Data = screenshotResult.content[0].data;
    const buffer = Buffer.from(base64Data, "base64");
    fs.writeFileSync(SCREENSHOT_PATH, buffer);

    console.log(`✅ Screenshot saved to: ${SCREENSHOT_PATH}`);
    console.log(`📊 Size: ${(buffer.length / 1024).toFixed(2)} KB`);

    console.log("🔍 Getting page title...");
    const titleResult = await sendRequest(mcp, "tools/call", {
      name: "browser_evaluate",
      arguments: { code: "document.title" },
    });
    console.log("✅ Page title:", titleResult.content[0].text);

    console.log("🧹 Closing browser...");
    await sendRequest(mcp, "tools/call", {
      name: "browser_close",
      arguments: {},
    });

    console.log("✅ Test completed successfully!");
    mcp.kill();
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    mcp.kill();
    process.exit(1);
  }
}

main();
