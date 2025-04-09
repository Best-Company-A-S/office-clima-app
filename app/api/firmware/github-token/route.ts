import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Token Setup Guide</title>
    <style>
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.5;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        color: #333;
      }
      h1 {
        color: #0070f3;
        margin-bottom: 1rem;
      }
      h2 {
        margin-top: 2rem;
        margin-bottom: 0.5rem;
      }
      .card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        margin-bottom: 20px;
      }
      ol {
        padding-left: 20px;
      }
      li {
        margin-bottom: 0.5rem;
      }
      .note {
        background: #f7f7f7;
        border-left: 4px solid #0070f3;
        padding: 10px 15px;
        margin: 15px 0;
      }
      .code {
        font-family: monospace;
        background: #f1f1f1;
        padding: 2px 4px;
        border-radius: 3px;
      }
      img {
        max-width: 100%;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin: 1rem 0;
      }
      .button {
        display: inline-block;
        background-color: #0070f3;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-weight: 500;
        text-decoration: none;
        cursor: pointer;
        margin-top: 1rem;
      }
      .button:hover {
        background-color: #0060df;
      }
      .permissions li {
        margin-bottom: 0.3rem;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>GitHub Token Setup Guide</h1>
      <p>
        To enable firmware synchronization from GitHub releases, you need to set up a personal access token 
        with the correct permissions.
      </p>
    </div>

    <div class="card">
      <h2>Step-by-Step Instructions</h2>
      <ol>
        <li>Visit <a href="https://github.com/settings/tokens?type=beta" target="_blank">GitHub Fine-grained tokens page</a></li>
        <li>Click <strong>Generate new token</strong></li>
        <li>Name your token <span class="code">Office Clima Firmware Updates</span></li>
        <li>Set expiration as needed (e.g., 90 days)</li>
        <li>Under <strong>Repository access</strong>, select <strong>Only select repositories</strong> and choose <span class="code">Best-Company-A-S/office-clima-device</span></li>
        <li>Under <strong>Permissions</strong>, enable:
          <ul class="permissions">
            <li><strong>Contents</strong>: Read-only</li>
            <li><strong>Metadata</strong>: Read-only</li>
          </ul>
        </li>
        <li>Click <strong>Generate token</strong> and copy the generated token</li>
        <li>Add the token to your <span class="code">.env</span> file as:
          <pre><code>GITHUB_TOKEN="your_token_here"</code></pre>
        </li>
        <li>Restart your development server with <span class="code">npm run dev</span></li>
      </ol>
    </div>

    <div class="card">
      <h2>Common Issues</h2>
      <div class="note">
        <p><strong>Repository not found</strong>: This usually means either:</p>
        <ul>
          <li>The repository name is incorrect - check the <span class="code">GITHUB_REPO</span> variable in <span class="code">app/api/firmware/sync-github/route.ts</span></li>
          <li>Your GitHub account doesn't have access to the repository</li>
          <li>Your token doesn't have the correct permissions</li>
        </ul>
      </div>
      
      <div class="note">
        <p><strong>Authentication failed</strong>: This usually means:</p>
        <ul>
          <li>The token format is incorrect - make sure it's copied exactly</li>
          <li>The token has expired - generate a new one</li>
          <li>For fine-grained tokens (starting with <span class="code">github_pat_</span>), ensure you're using the <span class="code">Bearer</span> authorization type</li>
        </ul>
      </div>
    </div>

    <a href="/dashboard" class="button">Return to Dashboard</a>
  </body>
  </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
