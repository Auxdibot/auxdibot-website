import Showdown from 'showdown';
import { renderToString } from '../render';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, MessageCircle } from 'lucide-react';

const alertConverter = new Showdown.Converter({
    metadata: true,
    ghCodeBlocks: true,
    parseImgDimensions: true,
    tables: true,
    emoji: true,
    customizedHeaderId: true,
});
Showdown.extension('alert', function (): Showdown.ShowdownExtension[] {
    var alerts: string[] = [];
    var msgs: string[] = [];
    return [
        {
            type: 'lang',
            regex: /(\|[!|T]\|[^]+?\|[!|T]\|)/gi,
            replace: function (_: string, match: string) {
                const alert = /^\|!\|/.test(match) ? 'alert' : 'message';
                match = match.replace(/^\|(!|T)\|/, '').replace(/\|(!|T)\|$/, '');
                if (alert == 'alert') alerts.push(match);
                else msgs.push(match);

                var n = (alert == 'alert' ? alerts : msgs).length - 1;
                return `|${alert == 'alert' ? "!" : "T"}|` + n + `|${alert == 'alert' ? "!" : "T"}|`;
            }
        },
        {
            type: 'output',
            filter: function (text) {
                for (var i = 0; i < alerts.length; ++i) {
                    const pat = new RegExp('\\|!\\|' + i + '\\|!\\|', 'g');
                    text = text.replaceAll(pat, renderToString(
                        <Alert variant={"destructive"} className='doc-alert'>
                            <AlertCircle />
                            <AlertTitle className='text-2xl'>Heads up!</AlertTitle>
                            <AlertDescription dangerouslySetInnerHTML={{ __html: alertConverter.makeHtml(alerts[i]) }}></AlertDescription>

                        </Alert>
                    ));
                }
                for (var i = 0; i < msgs.length; ++i) {
                    const pat = new RegExp('\\|T\\|' + i + '\\|T\\|', 'g');
                    text = text.replaceAll(pat, renderToString(
                        <Alert className='doc-alert'>
                            <MessageCircle />
                            <AlertTitle className='text-2xl'>Note</AlertTitle>
                            <AlertDescription dangerouslySetInnerHTML={{ __html: alertConverter.makeHtml(msgs[i]) }}></AlertDescription>

                        </Alert>
                    ));
                }
                msgs = [];
                alerts = [];
                return text;
            }
        }
    ];
});
