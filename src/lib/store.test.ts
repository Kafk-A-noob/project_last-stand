import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStore } from './store';
import { ASSET_MANIFEST } from '@/config/asset-manifest';

describe('useStore (Navigation Logic)', () => {
  // 各テスト前にストアをリセット（副作用を防ぐ）
  beforeEach(() => {
    const { result } = renderHook(() => useStore());
    act(() => {
      result.current.setTargetPath(ASSET_MANIFEST[0].path);
      result.current.resetModelData();
    });
  });
  it('should initialize with the first item', () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.targetPath).toBe(ASSET_MANIFEST[0].path);
  });
  it('goToNext should switch to the next active item', () => {
    const { result } = renderHook(() => useStore());

    // 1つ目はReact Logo (active: true)
    expect(result.current.targetPath).toBe('/models/React_Logo.glb');

    // Next Action
    act(() => {
      result.current.goToNext();
    });

    // 2つ目はRadio (active: true) なので、Radioになるはず
    expect(result.current.targetPath).toBe('/models/radio.glb');
  });
  it('goToNext should loop to the end', () => {
    const { result } = renderHook(() => useStore());

    /*
    アクティブな最後のアイテムまで進める
    (現状アクティブなのは Logo と Radio だけなので、Radioから次は Logo に戻るはず)
    まずRadioへ
    */
  
    act(() => {
      result.current.goToNext();
    });
      expect(result.current.targetPath).toBe('/models/radio.glb');

      // 次へ（ループ）
      act(() => {
        result.current.goToNext();
      });

      // 最初のアイテムに戻るはず
      expect(result.current.targetPath).toBe('/models/React_Logo.glb');
  });
    it('goToPrev should loop to the end', () => {
      const { result } = renderHook(() => useStore());

      // 最初(Logo)から戻る -> 最後(Radio)になるはず
      act(() => {
        result.current.goToPrev();
      });
      expect(result.current.targetPath).toBe('/models/radio.glb');
    });
});