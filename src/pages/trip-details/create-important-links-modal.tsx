import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateImportantLinksProps {
    closeCreateLinkModal: () => void;
}

export function CreateImportantLinks({closeCreateLinkModal}: CreateImportantLinksProps) {
    const { tripId } = useParams();
    const navigate = useNavigate();
    
    async function createImportantLink(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const title = data.get('title')?.toString();
      const url = data.get('link')?.toString();
  
      await api.post(`/trips/${tripId}/links`, {
        title,
        url,
      })
      navigate(0);  
    }

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Cadastrar link</h2>
                <button type='button' onClick={closeCreateLinkModal}>
                  <X className='size-5 text-zinc-400' />
                </button>
              </div>
              <p className='text-sm text-zinc-400'>
                Todos convidados podem visualizar os links cadastrados.
              </p>
            </div>
            <form onSubmit={createImportantLink} className='space-y-3' >
              <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <Tag className='size-5 text-zinc-400' />
                  <input
                    className="bg-transparent text-lg
                    placeholder-zinc-400 outline-none flex-1"
                    name='title'
                    placeholder="Titulo do link" />
              </div>
              
              <div className='h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                <Link2 className='size-5 text-zinc-400'/>
                <input
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                    type="text"
                    name='link'
                    placeholder="URL" />
              </div>
              <Button variant="primary" size="full">
                Salvar link
              </Button>
            </form>
          </div>
        </div>
    )
}