import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Popover } from '@mui/material';
import translate from 'counterpart';
import React, { useState } from 'react';

import { setCategoryAttr } from '../../../../helpers/setCategoryAttr';
import { Document } from '../../../../models/documents';
import multiIcon from '../../../PreviewModule/assets/multi.svg';
import singleIcon from '../../../PreviewModule/assets/single.svg';
import txtIcon from '../../../PreviewModule/assets/txt.svg';
import { DownloadButton, ItemAction, PopOverContentPlain, stylesPopOver } from '../styles';

interface Props {
    document: Document;
    listOrder: number;
    startDownload(_value: 'single' | 'multi' | 'txt'): void;
    title: string;
}

const DocumentDownloadButton = ({ document, listOrder, startDownload }: Props) => {
    const { documentType } = document;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const classes = stylesPopOver();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handlePopOverClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopOverClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <DownloadButton
                onClick={handlePopOverClick}
                data-qa={`qa-button-download-${listOrder}`}
                data-tm-event-category={setCategoryAttr()}
                data-tm-event-action='Download'
                data-tm-event-label={document.documentType}
                className={!document.previewThumbnail ? 'disabled' : anchorEl !== null ? 'pressed' : ''}
            >
                <SaveAltIcon />
                {translate('Download')}
            </DownloadButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopOverClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                classes={{ paper: classes.PopOverPaper }}
            >
                <PopOverContentPlain>
                    <ItemAction
                        onClick={() => startDownload('single')}
                        data-qa={`qa-button-download-single-PDF-${listOrder}`}
                        data-tm-event-category={setCategoryAttr()}
                        data-tm-event-action='Download PDF'
                        data-tm-event-label={documentType}
                    >
                        <img src={singleIcon} />
                        {translate('Digital pdf (single-page)')}
                    </ItemAction>

                    <ItemAction
                        onClick={() => startDownload('multi')}
                        data-qa={`qa-button-download-multi-PDF-${listOrder}`}
                        data-tm-event-category={setCategoryAttr()}
                        data-tm-event-action='Download PDF'
                        data-tm-event-label={documentType}
                    >
                        <img src={multiIcon} />
                        {translate('Print ready pdf (multi-page)')}
                    </ItemAction>

                    <ItemAction
                        onClick={() => startDownload('txt')}
                        data-qa={`qa-button-download-TXT-${listOrder}`}
                        data-tm-event-category={setCategoryAttr()}
                        data-tm-event-action='Download TXT'
                        data-tm-event-label={documentType}
                    >
                        <img src={txtIcon} />
                        {translate('TXT (plain text)')}
                    </ItemAction>
                </PopOverContentPlain>
            </Popover>
        </div>
    );
};
export { DocumentDownloadButton };
