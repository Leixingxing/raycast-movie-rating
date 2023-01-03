import { ActionPanel, Detail, List, Action } from "@raycast/api";

export default function Command() {
  return (
    <List>
      <List.Item
        icon="list-icon.png"
        title="Greeting"
        actions={
          <ActionPanel>
            <Action.Push title="Show Details" target={<Detail markdown="# Hello world! 👋" />} />
          </ActionPanel>
        }
      />
      <List.Item
        icon="list-icon.png"
        title="Greeting2"
        actions={
          <ActionPanel>
            <Action.Push title="Show Details" target={<Detail markdown="# Hello world! 👋" />} />
          </ActionPanel>
        }
      />
    </List>
  );
}
//sc-bZQynM DRpyB sc-bxivhb eJWSlY