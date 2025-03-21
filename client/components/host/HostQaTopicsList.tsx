import { Html } from "@kitajs/html";
import { TopicWithQuestionsAndVotes } from "../../../types";
import { HostQaTopic, hostQaTopicId } from "./HostQaTopic";
import baseStyles from "../../assets/base.module.css";

export function HostQaTopicsList({
  topics,
}: {
  topics: TopicWithQuestionsAndVotes[];
}) {
  return (
    <ol class={baseStyles.OrderedList} id="qa-admin-topic-list-list">
      {topics.map((topic, index) => (
        <HostQaTopic topic={topic} topics={topics} index={index} />
      ))}
    </ol>
  );
}
