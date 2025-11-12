import { useMemo } from "react";
import { t } from "ttag";

import { SettingsSection } from "metabase/admin/components/SettingsSection";
import { EmbeddingSettingsCard } from "metabase/admin/settings/components/EmbeddingSettings";
import type { EmbeddingSettingKey } from "metabase/admin/settings/components/EmbeddingSettings/EmbeddingToggle";
import { UpsellBanner } from "metabase/admin/upsells/components";
import { useSetting } from "metabase/common/hooks";
import { useSelector } from "metabase/lib/redux";
import {
  PLUGIN_CONTENT_TRANSLATION,
  PLUGIN_EMBEDDING_IFRAME_SDK_SETUP,
} from "metabase/plugins";
import { getUpgradeUrl } from "metabase/selectors/settings";
import { Box, Text } from "metabase/ui";

import { SettingTitle } from "../../SettingHeader";
import { EmbeddedResources } from "../../widgets/PublicLinksListing/EmbeddedResources";
import { EmbeddingSecretKeyWidget } from "../EmbeddingSecretKeyWidget";

type Props = {
  showContentTranslationSettings?: boolean;
};

export function SharedStaticEmbeddingSettings({
  showContentTranslationSettings,
}: Props) {
  const isSimpleEmbedFeatureAvailable =
    PLUGIN_EMBEDDING_IFRAME_SDK_SETUP.isFeatureEnabled();
  const isStaticEmbeddingEnabled = useSetting("enable-embedding-static");

  const upgradeUrl = useSelector((state) =>
    getUpgradeUrl(state, { utm_content: "admin_permissions" }),
  );

  const dependentSettingKeys: EmbeddingSettingKey[] = useMemo(
    // When the simple embed feature is not available (oss), we toggle both static and simple embedding
    () => (isSimpleEmbedFeatureAvailable ? [] : ["enable-embedding-simple"]),
    [isSimpleEmbedFeatureAvailable],
  );

  return (
    <>
      <EmbeddingSettingsCard
        title={t`Enable unauthenticated embeds`}
        description={t`A secure way to embed charts and dashboards when you don’t want to offer ad-hoc querying or chart drill-through.`}
        settingKey="enable-embedding-static"
        dependentSettingKeys={dependentSettingKeys}
      />

      {!isSimpleEmbedFeatureAvailable && (
        <UpsellBanner
          title={t`Upgrade to Metabase Pro for more powerful embedding methods`}
          campaign="embedded-analytics-js"
          location="embedding-page"
          buttonText={t`Upgrade`}
          buttonLink={upgradeUrl}
          dismissible
        >
          <Text c="text-medium" lh="md">
            {t`Embed charts, dashboards with drill-throughs, or even the query builder into your own application using customizable components. Secure your embeds with single sign-on.`}
          </Text>
        </UpsellBanner>
      )}

      <SettingsSection>
        <EmbeddingSecretKeyWidget />
      </SettingsSection>

      {isStaticEmbeddingEnabled && (
        <SettingsSection>
          <Box data-testid="embedded-resources">
            <SettingTitle
              id="static-embeds"
              fz="lg"
              mb="md"
            >{t`Published embeds`}</SettingTitle>

            <EmbeddedResources />
          </Box>
        </SettingsSection>
      )}

      {showContentTranslationSettings && (
        <PLUGIN_CONTENT_TRANSLATION.ContentTranslationConfiguration />
      )}
    </>
  );
}
