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
    <ol class={baseStyles.OrderedList}>
      {topics.map((topic, index) => (
        <li id={hostQaTopicId(topic.id)} class="mb-4">
          <HostQaTopic topic={topic} topics={topics} index={index} />
        </li>
      ))}
    </ol>
  );
}
