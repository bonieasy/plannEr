import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from 'date-fns';

interface DestinationAndDateStepProps {
    isGuestInputOpen: boolean;
    closeGuestsInput: () => void;
    openGuestsInput: () => void;
    setDestination: (destination: string) => void;
    setEventStartAndEndDates: (date: DateRange | undefined) => void;
    eventStartAndEndDates: DateRange | undefined;
}

export function DestinationAndDateStep({
    isGuestInputOpen,
    closeGuestsInput,
    openGuestsInput,
    setDestination,
    setEventStartAndEndDates,
    eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);


  const openDatePicker = () => {
    return setIsDatePickerOpen(true)
  };

  const closeDatePicker = () => {
    return setIsDatePickerOpen(false)
  };

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to 
  ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' ate ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
  : null

    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className='flex items-center gap-2 flex-1'>
              <MapPin className="size-5 text-zinc-400" />
              <input
                disabled={isGuestInputOpen}
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                type="text"
                placeholder="Para onde você vai?"
                onChange={event => setDestination(event.target.value)}
              />
            </div>

            <button onClick={openDatePicker} disabled={isGuestInputOpen} className='flex items-center gap-2 text-left w-[240px]'>
              <Calendar className="size-5 text-zinc-400" />
              <span className="text-lg text-zinc-400 w-40 flex-1">
                {displayedDate || 'Quando?'}
              </span>
            </button>

            {isDatePickerOpen && (
              <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-lg font-semibold'>Selecione a data</h2>
                      <button type='button' onClick={closeDatePicker}>
                        <X className='size-5 text-zinc-400' />
                      </button>
                    </div>
                  </div>
                  <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
                </div>
              </div>
            )}
            
            <div className='w-px h-6 bg-zinc-800' />

            {isGuestInputOpen ? (
              <button onClick={closeGuestsInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
                Alterar local/data
                <Settings2 className='size-5' />
              </button>
            ) :
              (
              <button onClick={openGuestsInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Continuar
                <ArrowRight className='size-5' />
              </button>
              )
            }
          </div>
    )
}