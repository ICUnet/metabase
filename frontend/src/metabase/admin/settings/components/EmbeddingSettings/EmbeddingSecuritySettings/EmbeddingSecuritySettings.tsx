import { t } from "ttag";

import {
  SettingsPageWrapper,
  SettingsSection,
} from "metabase/admin/components/SettingsSection";

import { SameSiteSelectWidget } from "./SameSiteSelectWidget";
import { SdkCorsInputWidget } from "./SdkCorsInputWidget";

export function EmbeddingSecuritySettings() {
  return (
    <SettingsPageWrapper title={t`Security`}>
      <SettingsSection>
        <SdkCorsInputWidget />
      </SettingsSection>

      <SettingsSection>
        <SameSiteSelectWidget />
      </SettingsSection>
    </SettingsPageWrapper>
  );
}
