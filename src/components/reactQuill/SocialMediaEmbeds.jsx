import React from "react";
import TelegramPostEmbed from "./TelegramPostEmbed";
import TwitterPostEmbed from "./TwitterPostEmbed";
import FacebookPostEmbed from "./FacebookPostEmbed";
import InstagramPostEmbed from "./InstagramPostEmbed";

function SocialMediaEmbeds() {
  return (
    <div>
      <h2>Telegram Post</h2>
      <TelegramPostEmbed postId="27" channel="pulmoliyaiqtisodiyotsiyosat" />

      <h2>Twitter Post</h2>
      <TwitterPostEmbed tweetUrl="https://twitter.com/Interior/status/463440424141459456" />

      <h2>Facebook Post</h2>
      <FacebookPostEmbed postUrl="https://www.facebook.com/20531316728/posts/10154009990506729/" />

      <h2>Instagram Post</h2>
      <InstagramPostEmbed postUrl="https://www.instagram.com/p/CG0UU3ylqHr/" />
    </div>
  );
}

export default SocialMediaEmbeds;
