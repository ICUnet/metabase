import type { ReactNode } from "react";
import { t } from "ttag";

import { UpsellGem } from "metabase/admin/upsells/components";
import { UpsellCard } from "metabase/common/components/UpsellCard";
import { useSdkIframeEmbedSetupContext } from "metabase-enterprise/embedding_iframe_sdk_setup/context";

import { TooltipWarning } from "./TooltipWarning";

const UPSELL_CARD_WIDTH = 252;

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
      icon={<UpsellGem />}
      warning={
        <UpsellCard
          title={t`Get more powerful embedding`}
          buttonLink="https://www.metabase.com/product/embedded-analytics"
          campaign="embedded-analytics-js"
          location="embedding-page"
          buttonText={
            /* eslint-disable-next-line no-literal-metabase-strings -- Button text */
            t`Try Metabase Pro`
          }
          maxWidth={UPSELL_CARD_WIDTH}
        >
          {t`Upgrade to get access to embeds with single sign-on, drill through, the SDK for React, and more.`}
        </UpsellCard>
      }
      disabled={disabled}
    >
      {children}
    </TooltipWarning>
  );
};
