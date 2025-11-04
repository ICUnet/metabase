import { push } from "react-router-redux";
import { c, t } from "ttag";

import { STATIC_LEGACY_EMBEDDING_TYPE } from "metabase/embedding/constants";
import { useDispatch } from "metabase/lib/redux";
import * as Urls from "metabase/lib/urls";
import { setOpenModal } from "metabase/redux/ui";
import { Alert, Anchor, Box, Flex, Icon, Stack, Text } from "metabase/ui";
import { useSdkIframeEmbedSetupContext } from "metabase-enterprise/embedding_iframe_sdk_setup/context";
import { getResourceTypeFromExperience } from "metabase-enterprise/embedding_iframe_sdk_setup/utils/get-resource-type-from-experience";
import type { Card, Dashboard } from "metabase-types/api";

export const LegacyStaticEmbeddingAlert = () => {
  const { settings, resource, experience, onClose } =
    useSdkIframeEmbedSetupContext();

  const dispatch = useDispatch();
  const isStaticEmbedding = !!settings.isStatic;

  const resourceType = getResourceTypeFromExperience(experience);
  const shouldShowForResource =
    resourceType === "dashboard" || resourceType === "question";

  if (
    !isStaticEmbedding ||
    !resource ||
    !resourceType ||
    !shouldShowForResource
  ) {
    return null;
  }

  const shouldShowLegacyStaticEmbeddingAlert =
    resource.enable_embedding && resource.embedding_type === "static-legacy";

  if (!shouldShowLegacyStaticEmbeddingAlert) {
    return null;
  }

  return (
    <Alert color="info" variant="outline">
      <Flex gap="sm">
        <Box>
          <Icon color="var(--mb-color-text-secondary)" name="info" mt="2px" />
        </Box>

        <Stack>
          <Text key="legacy-static-embedding-alert" c="text-primary" lh="lg">
            {t`This embed uses the legacy static embedding method. The controls shown are for the new embedding method, which is recommended.`}
          </Text>

          <Anchor
            key="anchor"
            fw="bold"
            lh="lg"
            onClick={() => {
              onClose();

              dispatch(
                push({
                  pathname:
                    resourceType === "dashboard"
                      ? Urls.dashboard({ id: (resource as Dashboard).id })
                      : Urls.question({ id: (resource as Card).id }),
                }),
              );

              dispatch(setOpenModal(STATIC_LEGACY_EMBEDDING_TYPE));
            }}
          >
            {c("A link that toggles the legacy static embedding wizard.")
              .t`Use legacy static embedding (not recommended)`}
          </Anchor>
        </Stack>
      </Flex>
    </Alert>
  );
};
