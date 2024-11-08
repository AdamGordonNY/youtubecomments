"use server";

import { YouTubeComment } from "@/types/types";

export default async function YouTubeComments({
  comments,
}: {
  comments: YouTubeComment[];
}) {
  return (
    <div>
      <h2>Your YouTube Comments</h2>
      <ul>
        {comments &&
          comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.comment}</p>
              <small>Video ID: {comment.videoId}</small>
              <br />
              <small>Published At: {comment.publishedAt}</small>
            </li>
          ))}
      </ul>
    </div>
  );
}
