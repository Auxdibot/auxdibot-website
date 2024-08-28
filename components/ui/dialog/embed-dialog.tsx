import { BsTextLeft } from 'react-icons/bs';
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import { Button } from '../button/button';
import { Controller } from 'react-hook-form';
import EmbedSettings, { EmbedSettingsProps } from '../messages/embed-settings';

export function EmbedDialog({
    control,
    register,
    removeField,
    addField,
    serverID,
    placeholderContext,
}: Omit<EmbedSettingsProps, 'value'>) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={'my-2 w-fit gap-2'} variant={'secondary'}>
                    <BsTextLeft /> Edit Embed
                </Button>
            </DialogTrigger>
            <DialogContent className={'max-h-[98dvh] overflow-y-scroll'}>
                <Controller
                    control={control}
                    name={'embed'}
                    render={({ field }) => {
                        return (
                            <EmbedSettings
                                placeholderContext={placeholderContext}
                                {...field}
                                serverID={serverID}
                                register={register}
                                control={control}
                                removeField={removeField}
                                addField={addField}
                            />
                        );
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
