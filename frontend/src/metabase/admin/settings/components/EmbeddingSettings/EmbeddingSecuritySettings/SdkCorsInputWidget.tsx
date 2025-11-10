import { jt, t } from "ttag";

import { AdminSettingInput } from "metabase/admin/settings/components/widgets/AdminSettingInput";
import { UpsellSdkLink } from "metabase/admin/upsells/UpsellSdkLink";
import { useSetting } from "metabase/common/hooks";
import {
  PLUGIN_EMBEDDING_IFRAME_SDK_SETUP,
  PLUGIN_EMBEDDING_SDK,
} from "metabase/plugins";
import { Box, Group, HoverCard, Icon, Text } from "metabase/ui";

export const SdkCorsInputWidget = () => {
  const isReactSdkEnabled = useSetting("enable-embedding-sdk");
  const isReactSdkFeatureAvailable = PLUGIN_EMBEDDING_SDK.isEnabled();
  const isLocalhostCorsDisabled = useSetting("disable-cors-on-localhost");

  const isSimpleEmbedEnabled = useSetting("enable-embedding-simple");
  const isSimpleEmbedFeatureAvailable =
    PLUGIN_EMBEDDING_IFRAME_SDK_SETUP.isFeatureEnabled();

  const isEmbeddingAvailable =
    isReactSdkFeatureAvailable || isSimpleEmbedFeatureAvailable;

  const corsHintText = isLocalhostCorsDisabled
    ? t`Separate values with a space. Localhost is not allowed. Changes will take effect within one minute.`
    : t`Separate values with a space. Localhost is automatically included. Changes will take effect within one minute.`;

  const canEditSdkOrigins =
    (isReactSdkFeatureAvailable && isReactSdkEnabled) ||
    (isSimpleEmbedFeatureAvailable && isSimpleEmbedEnabled);

  return (
    <AdminSettingInput
      title={t`Cross-Origin Resource Sharing (CORS)`}
      description={
        <Group align="center" gap="sm">
          <Text c="text-medium" fz="md">
            {isEmbeddingAvailable
              ? t`Enter the origins for the websites or apps where you want to allow SDK embedding.`
              : jt`Try out the SDK on localhost. To enable other sites, ${(<UpsellSdkLink key="upsell-sdk-link" />)} and enter the origins for the websites or apps where you want to allow SDK and Embedded Analytics JS.`}
          </Text>

          {isEmbeddingAvailable && (
            <HoverCard position="bottom">
              <HoverCard.Target>
                <Icon name="info" c="text-medium" cursor="pointer" />
              </HoverCard.Target>

              <HoverCard.Dropdown>
                <Box p="md" w={270} bg="white">
                  <Text lh="lg" c="text-medium">
                    {corsHintText}
                  </Text>
                </Box>
              </HoverCard.Dropdown>
            </HoverCard>
          )}
        </Group>
      }
      name="embedding-app-origins-sdk"
      placeholder="https://*.example.com"
      inputType="text"
      disabled={!canEditSdkOrigins}
    />
  );
};
