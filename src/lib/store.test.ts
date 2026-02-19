import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStore } from './store';
import { ASSET_MANIFEST } from '@/config/asset-manifest';

describe('useStore (Navigation Logic)', () => {
  const activeItems = ASSET_MANIFEST.filter(item => item.active);

  // 各テスト前にストアをリセット（副作用を防ぐ）
  beforeEach(() => {
    const { result } = renderHook(() => useStore());
    act(() => {
      // テスト開始時は「最初のActiveItem」にリセットする
      result.current.setTargetPath(activeItems[0].path);
      result.current.resetModelData();
    });
  });

  it('should initialize with the first item', () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.targetPath).toBe(activeItems[0].path);
  });

  it('goToNext should cycle through all active items', () => {
    const { result } = renderHook(() => useStore());

    // ループですべてのアイテムをチェック
    for (let i = 0; i < activeItems.length; i++) {
        // 現在のターゲットが正しいか確認
        expect(result.current.targetPath).toBe(activeItems[i].path);

        // 次へ進む
        act(() => {
            result.current.goToNext();
        });
    }

    // すべて回った後、最初(0番目)に戻っているはず
    expect(result.current.targetPath).toBe(activeItems[0].path);
  });

  it('goToPrev should loop to the end', () => {
    const { result } = renderHook(() => useStore());
    const lastItem = activeItems[activeItems.length - 1];

    // 最初(0)から戻る -> 最後(length-1)になるはず
    act(() => {
      result.current.goToPrev();
    });
    expect(result.current.targetPath).toBe(lastItem.path);
  });
});