import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './invite-guests-modal';
import { ConfirmTripModal } from './confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';


export function CreateTripPage() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false);
  const [isGuestsmodalOpen, setIsGuestsmodalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState(['boni@boni.com', 'john@acme.com']);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const navigate = useNavigate();

  const openGuestsInput = () => {
    setIsGuestInputOpen(true);
  };

  const closeGuestsInput = () => {
    setIsGuestInputOpen(false);
  };

  const openGuestModal = () => {
    setIsGuestsmodalOpen(true);
  };

  const closeGuestModal = () => {
    setIsGuestsmodalOpen(false);
  };

  const openConfirmTripModal = () => {
    setIsConfirmTripModalOpen(true);
  };

  const closeConfirmTripModal = () => {
    setIsConfirmTripModalOpen(false);
  };

  const createTrip = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()
    navigate('/trips/123');
  };

  const removeEmailFromInvite = (emailToRemove: string) => {
    const newEmailList = emailsToInvite.filter(invited => invited !== emailToRemove);
    setEmailsToInvite(newEmailList);
  };

  const addNewEmailToInvite = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //previne o comportamento padrão do formulário
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;

    if (!email || emailsToInvite.includes(email)) {
      return;
    }
    setEmailsToInvite([...emailsToInvite, email]) //imutabilidade - nunca alteramos uma informação
    event.currentTarget.reset();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="logo.svg" alt="Plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>
        
        <div className='space-y-4'>
            <DestinationAndDateStep
                isGuestInputOpen={isGuestInputOpen}
                closeGuestsInput={closeGuestsInput}
                openGuestsInput={openGuestsInput}
            />

          {isGuestInputOpen && (
            <InviteGuestsStep 
                openConfirmTripModal={openConfirmTripModal}
                emailsToInvite={emailsToInvite}
                openGuestModal={openGuestModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.</p>
      </div>
      {isGuestsmodalOpen && (
        <InviteGuestsModal
            closeGuestModal={closeGuestModal}
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            removeEmailFromInvite={removeEmailFromInvite} />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip} />
      )}

    </div>
  )
}
