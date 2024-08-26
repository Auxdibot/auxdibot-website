import { APIEmbed } from 'discord-api-types/v10';
import {
    Control,
    Controller,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFormRegister,
} from 'react-hook-form';
import {
    BsEyedropper,
    BsImage,
    BsListTask,
    BsPerson,
    BsPlus,
    BsTextCenter,
    BsTextLeft,
    BsTextarea,
    BsTrash,
} from 'react-icons/bs';
import ColorPicker from '../color-picker';
import { Input } from '../input';
import { TextareaMessage } from './textarea-message';
import { Checkbox } from '../checkbox';
import { Button } from '../button/button';

export interface EmbedSettingsProps {
    readonly value: APIEmbed;
    readonly register: UseFormRegister<any & { embed: APIEmbed }>;
    readonly control: Control<any & { embed: APIEmbed }>;
    readonly addField: UseFieldArrayAppend<any, 'embed.fields'>;
    readonly removeField: UseFieldArrayRemove;
    readonly serverID?: string;
    readonly placeholderContext?: string | string[];
}
export default function EmbedSettings({
    value,
    register,
    control,
    addField,
    removeField,
    serverID,
    placeholderContext,
}: EmbedSettingsProps) {
    return (
        <div className={'max-md:px-2'}>
            <h1 className={'flex items-center gap-2 font-montserrat text-2xl'}>
                <BsTextLeft /> Embed Settings
            </h1>
            <section className={'my-5 flex flex-col gap-2'}>
                <span
                    className={
                        'flex flex-row items-center gap-2 font-montserrat text-xl'
                    }
                >
                    <BsPerson /> Author
                </span>
                <span
                    className={
                        'grid w-full gap-3 max-sm:grid-rows-3 sm:grid-cols-3'
                    }
                >
                    <Input
                        placeholder='Author Name'
                        maxLength={256}
                        type='text'
                        {...register('embed.author.name', { maxLength: 256 })}
                    />
                    <Input
                        placeholder='Author URL'
                        type='text'
                        {...register('embed.author.url')}
                    />
                    <Input
                        placeholder='Author Icon URL'
                        type='text'
                        {...register('embed.author.icon_url')}
                    />
                </span>

                <span
                    className={
                        'flex flex-row items-center gap-2 font-montserrat text-xl'
                    }
                >
                    <BsTextCenter /> Title
                </span>
                <span
                    className={
                        'grid w-full gap-3 max-sm:grid-rows-3 sm:grid-cols-3'
                    }
                >
                    <Input
                        placeholder='Embed Title'
                        maxLength={256}
                        type='text'
                        {...register('embed.title', { maxLength: 256 })}
                    />
                    <Input
                        placeholder='Embed URL'
                        type='text'
                        {...register('embed.url')}
                    />
                    <Input
                        placeholder='Embed Thumbnail URL'
                        type='text'
                        {...register('embed.thumbnail.url')}
                    />
                </span>
                <Controller
                    control={control}
                    name={'embed.description'}
                    render={({ field }) => {
                        return (
                            <TextareaMessage
                                placeholderContext={placeholderContext}
                                serverID={serverID}
                                placeholder='Embed description here...'
                                className={'font-open-sans text-sm'}
                                maxLength={4096}
                                {...field}
                            />
                        );
                    }}
                />
                <span
                    className={
                        'flex flex-row items-center gap-2 font-montserrat text-xl'
                    }
                >
                    <BsListTask /> Fields
                </span>
                <span
                    className={
                        'secondary my-3 flex flex-row items-center justify-center gap-2 text-xl text-gray-300'
                    }
                >
                    <span
                        className={
                            'hover-gradient w-fit cursor-pointer rounded-2xl border p-1 text-lg text-white transition-all hover:border-black hover:text-black'
                        }
                        onClick={() =>
                            (value?.fields?.length || 0) < 25
                                ? addField(
                                      { name: '', value: '' },
                                      { shouldFocus: false }
                                  )
                                : {}
                        }
                    >
                        <BsPlus />
                    </span>{' '}
                    Add Field
                </span>
                <ul className={'my-3 flex flex-col gap-2'}>
                    {value?.fields?.map((_item, index) => (
                        <li key={index} className={'flex flex-col gap-2'}>
                            <h3 className={'mx-auto font-montserrat'}>
                                Field #{index + 1}
                            </h3>
                            <span className={'mx-auto flex w-fit gap-5'}>
                                <Button
                                    className={'gap-1'}
                                    type='button'
                                    onClick={() => removeField(index)}
                                    variant={'destructive'}
                                >
                                    <BsTrash /> Delete
                                </Button>
                                <label
                                    className={
                                        'text-md flex flex-1 flex-row items-center justify-center gap-2 font-open-sans'
                                    }
                                >
                                    Inline?
                                    <Controller
                                        name={`embed.fields.${index}.inline`}
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Checkbox
                                                    onCheckedChange={(e) =>
                                                        field.onChange(
                                                            !!e.valueOf()
                                                        )
                                                    }
                                                    value={field.value}
                                                />
                                            );
                                        }}
                                    />
                                </label>
                            </span>
                            <Input
                                placeholder='Field Name'
                                maxLength={256}
                                type='text'
                                className={'mx-auto w-fit min-w-[200px] flex-1'}
                                {...register(`embed.fields.${index}.name`, {
                                    maxLength: 256,
                                })}
                            />
                            <Controller
                                control={control}
                                name={`embed.fields.${index}.value`}
                                render={({ field }) => {
                                    return (
                                        <TextareaMessage
                                            placeholderContext={
                                                placeholderContext
                                            }
                                            serverID={serverID}
                                            placeholder='Embed field description here...'
                                            className={'font-open-sans text-sm'}
                                            maxLength={1024}
                                            {...field}
                                        />
                                    );
                                }}
                            />
                        </li>
                    )) || ''}
                </ul>

                <span
                    className={
                        'flex flex-row items-center gap-2 font-montserrat text-xl'
                    }
                >
                    <BsTextarea /> Footer
                </span>
                <span
                    className={
                        'grid w-full gap-3 max-sm:grid-rows-3 sm:grid-cols-3'
                    }
                >
                    <Input
                        placeholder='Footer text'
                        type='text'
                        className={'sm:col-span-2'}
                        maxLength={2048}
                        {...register('embed.footer.text', { maxLength: 2048 })}
                    />
                    <Input
                        placeholder='Footer Icon URL'
                        type='text'
                        {...register('embed.footer.icon_url')}
                    />
                </span>
                <span
                    className={
                        'mx-auto my-5 flex w-full max-w-2xl justify-center max-md:flex-col max-md:gap-5'
                    }
                >
                    <section
                        className={
                            'mx-auto flex flex-1 flex-col items-center justify-between gap-2 self-stretch font-montserrat text-xl'
                        }
                    >
                        <label
                            className={
                                'flex flex-row items-center gap-2 text-lg'
                            }
                        >
                            <BsImage /> Embed Image:
                        </label>
                        <Input type='text' {...register('embed.image.url')} />
                    </section>
                    <section className={'flex flex-1 flex-col items-center'}>
                        <label
                            className={
                                'flex items-center gap-2 text-left font-montserrat text-lg'
                            }
                        >
                            <BsEyedropper /> Embed Color:
                        </label>
                        <span className={'self-center max-md:mx-auto'}>
                            <Controller
                                control={control}
                                name={'embed.color'}
                                render={({ field }) => {
                                    return (
                                        <ColorPicker
                                            value={field.value
                                                ?.toString(16)
                                                .padStart(6, '0')}
                                            onChange={field.onChange}
                                        />
                                    );
                                }}
                            />{' '}
                        </span>
                    </section>
                </span>
            </section>
        </div>
    );
}
