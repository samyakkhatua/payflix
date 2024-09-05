"use client";

import { useCheckPremium } from '@/lib/hooks/users/useCheckPremium';
import React, { use } from 'react'
import UpgradeButton from './upgradeButton';
import { useGetSignedURL } from '@/lib/hooks/videos/useGetSignedURL';

export const VideoPlayer = () => {

    const {
        data: isPremium,
        isPending,
        isError,
    } = useCheckPremium();

    const {
      data: signedURL,
      isPending: isSignedURLPending,
      isError: isSignedURLError,
    } = useGetSignedURL("https://iframe.mediadelivery.net/embed/294054/a29dde54-2fa9-431f-abbb-2abc06ec0370");

    if (isPending || isSignedURLPending) {
        return <div>Loading...</div>
    }
    if (isError || isSignedURLError) {
        return <div>Error</div>
    }
    if (!isPremium || !signedURL) {
        return <div>
            <p>Upgrade to premium to watch the video</p>
            <UpgradeButton />
        </div>
        
    }
    return (
      <div 
          style={{
              border:0,
              position: "absolute",
              top:0,
              height: "100%",
              width: "100%",
          }}
        >
          <iframe
            src={signedURL}
            loading="lazy"
            style={{
              border:0,
              position: "absolute",
              top:0,
              height: "100%",
              width: "100%",
            }}
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            allowFullScreen = {true}
          ></iframe>
      </div>
    )
}
