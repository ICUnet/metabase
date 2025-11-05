import { useCallback, useEffect, useState } from "react";

import type {
  DashboardSharingModalType,
  QuestionSharingModalType,
} from "metabase/embedding/components/SharingMenu/types";
import { STATIC_LEGACY_EMBEDDING_TYPE } from "metabase/embedding/constants";
import { useOpenEmbedJsWizard } from "metabase/embedding/hooks/use-open-embed-js-wizard";
import { useDispatch, useSelector } from "metabase/lib/redux";
import { isEEBuild } from "metabase/lib/utils";
import type {
  EmbedResource,
  EmbedResourceType,
} from "metabase/public/lib/types";
import { setOpenModal } from "metabase/redux/ui";
import { getCurrentOpenModal } from "metabase/selectors/ui";
import type { ModalName } from "metabase-types/store/modal";

export const useSharingModal = <
  TModalType extends DashboardSharingModalType | QuestionSharingModalType,
>({
  resource,
  resourceType,
}: {
  resource: EmbedResource;
  resourceType: EmbedResourceType;
}) => {
  const dispatch = useDispatch();
  const currentOpenModal = useSelector(getCurrentOpenModal);

  const [modalType, setModalType] = useState<TModalType | null>(null);

  const openEmbedJsWizard = useOpenEmbedJsWizard({
    resource,
    resourceType,
  });

  useEffect(() => {
    const allowedModalTypes: ModalName[] = [STATIC_LEGACY_EMBEDDING_TYPE];

    const isValidModalType =
      currentOpenModal && allowedModalTypes.includes(currentOpenModal);

    if (isValidModalType) {
      setModalType(currentOpenModal as TModalType);
    }
  }, [dispatch, currentOpenModal]);

  const handleSetModalType = useCallback(
    (modalType: TModalType | null) => {
      if (!modalType) {
        dispatch(setOpenModal(null));
      }

      if (isEEBuild()) {
        // Force open EmbedJS wizard for EE/Pro
        openEmbedJsWizard({ onBeforeOpen: () => setModalType(null) });
      } else {
        // Open Embed Type modal for oss
        setModalType(modalType);
      }
    },
    [dispatch, openEmbedJsWizard],
  );

  return { modalType, setModalType: handleSetModalType };
};
