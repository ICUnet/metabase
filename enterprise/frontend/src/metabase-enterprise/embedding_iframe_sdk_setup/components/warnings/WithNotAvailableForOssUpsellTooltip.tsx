import type { ReactNode } from "react";

import { useSdkIframeEmbedSetupContext } from "metabase-enterprise/embedding_iframe_sdk_setup/context";

import { TooltipWarning } from "./TooltipWarning";

export const WithNotAvailableForOssUpsellTooltip = ({
  children,
  shouldWrap,
}: {
  children: (data: { disabled: boolean }) => ReactNode;
  shouldWrap: boolean;
}) => {
  const { settings } = useSdkIframeEmbedSetupContext();

  const disabled = !!settings.isStatic;

  return (
    <TooltipWarning
      shouldWrap={shouldWrap}
      icon="gem"
      warning={"TODO"}
      disabled={disabled}
    >
      {children}
    </TooltipWarning>
  );
};
