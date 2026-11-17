import React from "react";
import { AwardBadge } from "./award-badge";

export const SingleAwardBadge = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AwardBadge slogan="Never Get Lost Again." header="MIT ADT NAVIGATION" />
    </div>
  );
};

export const AwardBadgeShowcase = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
      <SingleAwardBadge />
    </div>
  );
};
