import postReducer, { setFormVisible, setImageFile } from '../postReducer';

describe('postReducer', () => {
  describe('openPostForm', () => {
    it('changes setFormVisible', () => {
      const initialState = { formVisible: false };

      const state = postReducer(initialState, setFormVisible(true));

      expect(state.formVisible).toBe(true);
    });
  });

  describe('setImageFile', () => {
    it('changes imageFile', () => {
      const initialState = { imageFile: null };

      const imageFile = new FormData();
      imageFile.append('image', new Blob());

      const state = postReducer(initialState, setImageFile(imageFile));

      expect(state.imageFile).not.toBeNull();
    });
  });
});