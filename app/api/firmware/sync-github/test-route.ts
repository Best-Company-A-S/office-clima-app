import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const token = process.env.GITHUB_TOKEN || "";

    // Format of the token for debugging (masked)
    const tokenInfo = {
      type: token.startsWith("github_pat_")
        ? "Fine-grained token"
        : "Classic token",
      length: token.length,
      prefix: token.substring(0, 10) + "...", // Just show the first 10 chars
    };

    // Test GitHub API access
    let userResponse;
    try {
      userResponse = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "H2Climate-App",
        },
      });
    } catch (error: any) {
      return NextResponse.json({
        tokenInfo,
        error: "Failed to access GitHub API",
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        headers: Object.fromEntries(
          Object.entries(error.config?.headers || {}).filter(
            ([key]) => key.toLowerCase() !== "authorization"
          )
        ),
      });
    }

    // Try to access the repo
    try {
      const repoResponse = await axios.get(
        "https://api.github.com/repos/Best-Company-A-S/office-clima-device",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "H2Climate-App",
          },
        }
      );

      return NextResponse.json({
        tokenInfo,
        userLogin: userResponse.data.login,
        repoAccess: "success",
        repoName: repoResponse.data.full_name,
        repoDescription: repoResponse.data.description,
        repoPrivate: repoResponse.data.private,
      });
    } catch (error: any) {
      return NextResponse.json({
        tokenInfo,
        userLogin: userResponse.data.login,
        repoAccess: "failed",
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Test failed",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
