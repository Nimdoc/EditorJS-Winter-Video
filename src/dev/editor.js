import EditorJS from '@editorjs/editorjs'; 
import WinterVideo from '../main';

const editor = new EditorJS({ 
  /** 
   * Id of Element that should contain the Editor 
   */ 
  holder: 'editorjs', 
  tools: {
    WinterVideo: WinterVideo
  }
})