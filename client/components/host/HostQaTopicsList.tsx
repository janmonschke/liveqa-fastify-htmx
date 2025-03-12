import { Html } from "@kitajs/html";
import { TopicWithQuestions } from "../../../types";
import { HostQaTopic, hostQaTopicId } from "./HostQaTopic";
import baseStyles from "../../assets/base.module.css";

export function HostQaTopicsList({ topics }: { topics: TopicWithQuestions[] }) {
  return (
    <ol class={baseStyles.OrderedList}>
      {topics.map((topic, index) => (
        <li id={hostQaTopicId(topic.id)}>
          <HostQaTopic topic={topic} topics={topics} index={index} />
        </li>
      ))}
    </ol>
  );
}
