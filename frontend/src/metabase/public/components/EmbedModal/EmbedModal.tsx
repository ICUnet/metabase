import { t } from "ttag";

import Modal from "metabase/common/components/Modal";
import { useOpenEmbedJsWizard } from "metabase/embedding/hooks/use-open-embed-js-wizard";
import { StaticEmbedSetupPane } from "metabase/public/components/EmbedModal/StaticEmbedSetupPane";
import type {
  EmbedResource,
  EmbedResourceParameter,
  EmbeddingParameters,
  StaticEmbedResourceType,
} from "metabase/public/lib/types";

import { EmbedModalHeader } from "./EmbedModal.styled";

interface EmbedModalProps {
  isOpen?: boolean;
  resource: EmbedResource;
  resourceType: StaticEmbedResourceType;
  resourceParameters: EmbedResourceParameter[];

  onUpdateEnableEmbedding: (enableEmbedding: boolean) => void;
  onUpdateEmbeddingParams: (embeddingParams: EmbeddingParameters) => void;
  onClose: () => void;
}

export const EmbedModal = ({
  isOpen,
  resource,
  resourceType,
  resourceParameters,
  onUpdateEnableEmbedding,
  onUpdateEmbeddingParams,
  onClose,
}: EmbedModalProps) => {
  const openEmbedJsWizard = useOpenEmbedJsWizard({
    resource,
    resourceType,
  });

  const onEmbedClose = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onEmbedClose}
      fit
      formModal={false}
      // needed to allow selecting with the mouse on the code samples
      enableMouseEvents
    >
      <EmbedModalHeader
        onClose={onEmbedClose}
        onBack={() => {
          openEmbedJsWizard({ onBeforeOpen: () => onClose() });
        }}
      >
        {t`Static embedding`}
      </EmbedModalHeader>

      <StaticEmbedSetupPane
        resource={resource}
        resourceType={resourceType}
        resourceParameters={resourceParameters}
        onUpdateEnableEmbedding={onUpdateEnableEmbedding}
        onUpdateEmbeddingParams={onUpdateEmbeddingParams}
      />
    </Modal>
  );
};
