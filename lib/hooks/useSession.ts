import { useQuery } from "react-query";

export default function useSession() {
    let { data: session, status } = useQuery(["session"], async () => await fetch('/bot/v1/auth')
    .then(async (data) => await data.json()).catch((() => ({ "status": "error"}))));
    if (status == "loading") session = {"status": "loading"};
    return session;
}