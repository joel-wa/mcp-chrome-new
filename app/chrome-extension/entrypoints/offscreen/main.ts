import { MessageTarget, SendMessageType } from '@/common/message-types';

interface OffscreenMessage {
  target: MessageTarget | string;
  type: SendMessageType | string;
}

type MessageResponse = {
  result?: string;
  error?: string;
  success?: boolean;
};

// Listen for messages from background
chrome.runtime.onMessage.addListener(
  (
    message: OffscreenMessage,
    _sender,
    sendResponse: (response?: MessageResponse) => void,
  ): true | void => {
    // All semantic engine functionality has been removed
    console.log('Offscreen: Semantic engine functionality has been removed');
    sendResponse({
      success: false,
      error: 'Semantic engine functionality has been removed',
    });
    return true;
  },
);

console.log('Offscreen: Document initialized (semantic engine support removed)');
