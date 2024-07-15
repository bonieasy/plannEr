import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Participants {
    id: string,
    name: string | null,
    email: string,
    is_confirmed: boolean,
}

export function Guests() {
    const { tripId } = useParams();
    const [participants, setParticipants] = useState<Participants[]>();
  
    useEffect(() => {
      api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId]);
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">

            {participants?.map((participant, index) => {
                return (
                    <div key={participant.id} className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                            <span className="block font-sm text-zinc-400 truncate">{participant.email}</span>
                        </div>
                        {participant.is_confirmed ? (
                            <CircleCheck className=" size-5 text-lime-300" />
                        ) : (
                            <CircleDashed className=" size-5 text-zinc-400 shrink-0" />
                        )}
                    </div>
                )
            })}
            </div>
                <button className="bg-zinc-800 w-full justify-center text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-zinc-700">
                    <UserCog className="size-5" />
                    Gerenciar convidados
                </button>
        </div>
    )
}