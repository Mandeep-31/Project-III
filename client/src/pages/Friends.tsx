import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

const Friends = () => {

  const [receiverId, setReceiverId] =
    useState("");

  const [
    pendingRequests,
    setPendingRequests
  ] = useState<any[]>([]);

  const [
    friends,
    setFriends
  ] = useState<any[]>([]);

  const handleSendRequest = async () => {

    try {

      const response =
        await api.post(
          "/friends/request",
          {
            receiverId:
              Number(receiverId)
          }
        );

      alert(
        response.data.message
      );

      setReceiverId("");

    } catch (error: any) {

      alert(
        error.response?.data?.message ||
        "Failed to send request"
      );

    }

  };

  const fetchPendingRequests =
    async () => {

      try {

        const response =
          await api.get(
            "/friends/pending"
          );

        setPendingRequests(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

  };

  const fetchFriends =
    async () => {

      try {

        const response =
          await api.get(
            "/friends/all"
          );

        setFriends(
          response.data
        );

      } catch (error) {

        console.log(error);

      }

  };

  const handleAcceptRequest =
    async (
      requestId: number
    ) => {

      try {

        const response =
          await api.post(
            "/friends/accept",
            {
              requestId
            }
          );

        alert(
          response.data.message
        );

        fetchPendingRequests();

        fetchFriends();

      } catch (error: any) {

        alert(
          error.response?.data?.message ||
          "Failed to accept request"
        );

      }

  };

  useEffect(() => {

    fetchPendingRequests();

    fetchFriends();

  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Friends
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl max-w-xl">

        <h2 className="text-2xl mb-4">
          Send Friend Request
        </h2>

        <div className="flex gap-4">

          <input
            type="number"
            placeholder="Receiver User ID"
            value={receiverId}
            onChange={(e) =>
              setReceiverId(
                e.target.value
              )
            }
            className="
              flex-1
              p-3
              rounded-lg
              bg-slate-700
              outline-none
            "
          />

          <button
            onClick={handleSendRequest}
            className="
              bg-blue-500
              hover:bg-blue-600
              px-6
              rounded-lg
            "
          >
            Send
          </button>

        </div>

      </div>

      <div className="mt-8 bg-slate-800 p-6 rounded-xl max-w-xl">

        <h2 className="text-2xl mb-4">
          Pending Requests
        </h2>

        <div className="space-y-4">

          {pendingRequests.map((request) => (

            <div
              key={request.id}
              className="
                bg-slate-700
                p-4
                rounded-lg
              "
            >

              <p className="font-semibold">
                {request.sender.username}
              </p>

              <p className="text-slate-400 text-sm">
                {request.sender.email}
              </p>

              <button
                onClick={() =>
                  handleAcceptRequest(
                    request.id
                  )
                }
                className="
                  mt-3
                  bg-green-500
                  hover:bg-green-600
                  px-4
                  py-2
                  rounded-lg
                "
              >
                Accept
              </button>

            </div>

          ))}

        </div>

      </div>

      <div className="mt-8 bg-slate-800 p-6 rounded-xl max-w-xl">

        <h2 className="text-2xl mb-4">
          Friends List
        </h2>

        <div className="space-y-4">

          {friends.map((friend) => {

            const user =
              friend.sender.id ===
              Number(
                localStorage.getItem(
                  "userId"
                )
              )
                ? friend.receiver
                : friend.sender;

            return (

              <div
                key={friend.id}
                className="
                  bg-slate-700
                  p-4
                  rounded-lg
                "
              >

                <p className="font-semibold">
                  {user.username}
                </p>

                <p className="text-slate-400 text-sm">
                  {user.email}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
};

export default Friends;