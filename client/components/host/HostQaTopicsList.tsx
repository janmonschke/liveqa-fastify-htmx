import { Html } from "@kitajs/html";
import { TopicWithQuestions } from "../../../types";
import { HostQaTopic, hostQaTopicId } from "./HostQaTopic";

export function HostQaTopicsList({ topics }: { topics: TopicWithQuestions[] }) {
  return (
    <ol>
      {topics.map((topic, index) => (
        <li id={hostQaTopicId(topic.id)}>
          <HostQaTopic topic={topic} topics={topics} index={index} />
        </li>
      ))}
    </ol>
  );
}
