import { useState } from "react";
import { t } from "ttag";

import { useUpdateSettingsMutation } from "metabase/api";
import { useToast } from "metabase/common/hooks";
import { Button, Card, Group, Icon, Stack, Text } from "metabase/ui";
import { useSdkIframeEmbedSetupContext } from "metabase-enterprise/embedding_iframe_sdk_setup/context";

export const EnableStaticEmbeddingCard = () => {
  const { isEE, isStaticEmbeddingEnabled } = useSdkIframeEmbedSetupContext();
  const [updateSettings] = useUpdateSettingsMutation();
  const [sendToast] = useToast();

  // Freeze the card visibility to show even when we enabled the embedding setting.
  // This allows us to show the "Enabled" button state and not hide the card.
  const [showStaticEmbedding] = useState(!isStaticEmbeddingEnabled);

  const handleEnableEmbedding = async () => {
    try {
      await updateSettings({
        "enable-embedding-static": true,
      });
    } catch (error) {
      sendToast({ message: t`Failed to enable unauthenticated embedding` });
    }
  };

  if (isEE || !showStaticEmbedding) {
    return null;
  }

  return (
    <Card p="md" mb="md">
      <Stack gap={0}>
        <Text fz="md" c="text-dark">
          {t`Enable unauthenticated embeds to get started.`}
        </Text>

        <Group justify="flex-end" mt="md">
          <Button
            variant={isStaticEmbeddingEnabled ? "default" : "filled"}
            onClick={handleEnableEmbedding}
            disabled={isStaticEmbeddingEnabled}
            leftSection={isStaticEmbeddingEnabled && <Icon name="check" />}
          >
            {isStaticEmbeddingEnabled ? t`Enabled` : t`Enable to continue`}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};
