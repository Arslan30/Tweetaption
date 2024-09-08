import React from "react";
import { TweetDefinitelyExists } from "../../../../../../types/constants";
import VerifiedIcon from "./BlueVerifiedIcon";
import GoldVerifiedIcon from "./GoldVerifiedIcon";
import GrayVerifiedIcon from "./GrayVerifiedIcon";

export const TweetAuthorName = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div style={{ display: 'flex', fontWeight: 700, gap: '4px', alignItems: 'center' }}>
      <div style={{ whiteSpace: 'nowrap' }}>{tweet.user.name}</div>
      {!tweet.user.is_blue_verified ? null : (
        tweet.user.verified_type === "Business" ? (
          <GoldVerifiedIcon />
        ) : tweet.user.verified_type === "Government" ? (
          <GrayVerifiedIcon />
        ) : (
          <VerifiedIcon />
        )
      )}
    </div>

  );
};
