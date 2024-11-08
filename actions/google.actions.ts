"use server";

import { YouTubeComment } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import { google } from "googleapis";
export async function getGoogleOAuthToken() {
  const { sessionId, getToken } = await auth();
  if (!sessionId) {
    throw new Error("User is not authenticated.");
  }
  const googleOAuthToken = await getToken();
  if (!googleOAuthToken) {
    throw new Error("Google OAuth token not available.");
  }
  return googleOAuthToken;
}

export async function fetchYouTubeComments() {
  const accessToken = await getGoogleOAuthToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const youtube = await google.youtube({ version: "v3", auth: oauth2Client });

  const response = await youtube.comments.list({
    part: ["snippet"],
    maxResults: 100,
    textFormat: "html",

    callback: "JSON_CALLBACK",
  });

  const comments = response?.data?.items?.map((item) => ({
    comment: item.snippet?.textDisplay,
    videoId: item.snippet?.videoId,
    publishedAt: item.snippet?.publishedAt,
  }));

  return comments;
}
export async function loadComments() {
  try {
    const fetchedComments = await fetchYouTubeComments();
    if (fetchedComments) {
      return fetchedComments as YouTubeComment[];
    }
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}
