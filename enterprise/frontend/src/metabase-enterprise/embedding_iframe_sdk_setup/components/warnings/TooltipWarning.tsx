import type { ReactNode } from "react";

import { Box, Flex, HoverCard, Icon } from "metabase/ui";

export const TooltipWarning = ({
  children,
  shouldWrap = true,
  icon,
  warning,
  disabled,
}: {
  children: (data: { disabled: boolean }) => ReactNode;
  shouldWrap?: boolean;
  icon?: ReactNode;
  warning: ReactNode;
  disabled: boolean;
}) => {
  if (!shouldWrap) {
    return children({ disabled: false });
  }

  return (
    <Flex align="baseline" gap="xs">
      {children({ disabled })}

      {disabled && (
        <HoverCard position="bottom">
          <HoverCard.Target>
            <Box>
              {icon ?? (
                <Icon
                  name={"info"}
                  size={14}
                  c="text-medium"
                  cursor="pointer"
                  style={{ flexShrink: 0 }}
                />
              )}
            </Box>
          </HoverCard.Target>
          <HoverCard.Dropdown>{warning}</HoverCard.Dropdown>
        </HoverCard>
      )}
    </Flex>
  );
};
