export const getSessionId = () => {
  let id = localStorage.getItem("secure_talk_session");

  if (!id) {
    id = "anon_" + Math.random().toString(36).substring(2);
    localStorage.setItem("secure_talk_session", id);
  }

  return id;
};