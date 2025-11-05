import { useCallback } from "react";

import { useDispatch } from "metabase/lib/redux";
import type { SdkIframeEmbedSetupModalProps } from "metabase/plugins";
import type {
  EmbedResource,
  EmbedResourceType,
} from "metabase/public/lib/types";
import { setOpenModalWithProps } from "metabase/redux/ui";

export const useOpenEmbedJsWizard = ({
  resource,
  resourceType,
}: {
  resource: EmbedResource;
  resourceType: EmbedResourceType;
}) => {
  const dispatch = useDispatch();

  return useCallback(
    ({ onBeforeOpen }: { onBeforeOpen?: () => void }) => {
      const modalProps: Pick<SdkIframeEmbedSetupModalProps, "initialState"> = {
        initialState: {
          resourceType,
          resourceId: resource.id,
          isStatic: true,
          useExistingUserSession: false,
        },
      };

      onBeforeOpen?.();

      dispatch(
        setOpenModalWithProps({
          id: "embed",
          props: modalProps,
        }),
      );
    },
    [dispatch, resource.id, resourceType],
  );
};
