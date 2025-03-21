export function qa(qaId: string) {
  return `/qa/${qaId}`;
}

export function qaSse(qaId: string) {
  return `/sse${qa(qaId)}`;
}

export function qaQr(qaId: string) {
  return `/qa/qr/${qaId}`;
}

export function qaQuestionCrud(qaId: string) {
  return `${qa(qaId)}/question`;
}

export function qaQuestionDelete(qaId: string) {
  return `${qa(qaId)}/question/delete`;
}

export function questionList(qaId: string, topicId: string) {
  return `${qa(qaId)}/topic/${topicId}/questions`;
}

export function questionListAdmin(qaId: string, topicId: string) {
  return `${qa(qaId)}/admin/topic/${topicId}/questions`;
}

export function qaAddVote(qaId: string) {
  return `${qa(qaId)}/add-vote`;
}

export function qaDeleteVote(qaId: string) {
  return `${qa(qaId)}/delete-vote`;
}

export function qaTopicsList(qaId: string) {
  return `${qa(qaId)}/topics`;
}

export function qaAdmin(qaId: string) {
  return `/qa/admin/${qaId}`;
}

export function qaTopicCrud(qaId: string) {
  return `${qaAdmin(qaId)}/topic`;
}

export function qaTopicDelete(qaId: string) {
  return `${qaAdmin(qaId)}/topic/delete`;
}

export function qaTopicSwap(qaId: string) {
  return `${qaAdmin(qaId)}/topic/swap`;
}

export function qaConfigCrud(qaId: string) {
  return `${qaAdmin(qaId)}/config`;
}

export function qaAdminQuestionDelete(qaId: string, questionId: string) {
  return `${qaAdmin(qaId)}/question/${questionId}/delete`;
}

export function qaAdmingQuestionResolved(qaId: string, questionId: string) {
  return `${qaAdmin(qaId)}/question/${questionId}/resolve`;
}
