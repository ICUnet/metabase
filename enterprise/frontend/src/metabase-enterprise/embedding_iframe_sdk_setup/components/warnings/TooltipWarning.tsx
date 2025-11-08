import type { ReactNode } from "react";

import { Flex, HoverCard, Icon, type IconName, Text } from "metabase/ui";

export const TooltipWarning = ({
  children,
  shouldWrap = true,
  icon,
  warning,
  disabled,
}: {
  children: (data: { disabled: boolean }) => ReactNode;
  shouldWrap?: boolean;
  icon?: IconName;
  warning: string;
  disabled: boolean;
}) => {
  if (!shouldWrap) {
    return children({ disabled: false });
  }

  return (
    <Flex align="center" gap="xs">
      {children({ disabled })}

      {disabled && (
        <HoverCard position="bottom">
          <HoverCard.Target>
            <Icon
              name={icon ?? "info"}
              size={14}
              c="text-medium"
              cursor="pointer"
              style={{ flexShrink: 0 }}
            />
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text lh="md" p="md">
              {warning}
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      )}
    </Flex>
  );
};
