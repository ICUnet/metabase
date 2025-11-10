import { t } from "ttag";

import {
  RelatedSettingsSection,
  getStaticEmbeddingRelatedSettingItems,
} from "metabase/admin/components/RelatedSettingsSection";
import { SettingsPageWrapper } from "metabase/admin/components/SettingsSection";
import { SharedStaticEmbeddingSettings } from "metabase/admin/settings/components/EmbeddingSettings/SharedStaticEmbeddingSettings";

export function StaticEmbeddingSettings() {
  return (
    <SettingsPageWrapper title={t`Static embedding`}>
      <SharedStaticEmbeddingSettings />

      <RelatedSettingsSection items={getStaticEmbeddingRelatedSettingItems()} />
    </SettingsPageWrapper>
  );
}
