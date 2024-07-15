import { Link2, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { CreateImportantLinks } from "./create-important-links-modal";

interface ImportantLinks {
    id: string,
    title: string,
    url: string,
}

export function ImportantLinks() {
    const { tripId } = useParams();
    const [importantLinks, setImportantLinks] = useState<ImportantLinks[]>();
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

    const openCreateLinkModal = () => {
        setIsCreateLinkModalOpen(true);
      };
    
      const closeCreateLinkModal = () => {
        setIsCreateLinkModalOpen(false);
      };

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => setImportantLinks(response.data.links))
      }, [tripId]);
    
    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>
            <div className="space-y-5">
                {importantLinks?.length ?? 0 > 0 ? (
                    <div>
                    {importantLinks?.map((link, index) => {
                        return (
                            <div key={index} className="flex items-center justify-between gap-4">
                                <div className="space-y-1.5">
                                    <span className="block font-medium text-zinc-100">{link.title}</span>
                                    <a href="#" className="block font-xs text-zinc-400 truncate hover:text-zinc-200">
                                        {link.url}
                                    </a>
                                </div>
                                <Link2 className=" size-5 text-zinc-400 shrink-0" />
                            </div>
                        )
                    })}
                    </div>
                ) : (
                <p className="text-zinc-500 text-sm">
                    Nenhum link cadastrado ainda.
                </p>
                )}
            </div>
            <button onClick={openCreateLinkModal} className="bg-zinc-800 w-full justify-center text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-zinc-700">
                <Plus className="size-5" />
                Cadastrar novo link
            </button>
            {isCreateLinkModalOpen && (
                <CreateImportantLinks closeCreateLinkModal={closeCreateLinkModal} />
            )}
      </div>
    )
}