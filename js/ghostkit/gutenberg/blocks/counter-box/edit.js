/**
 * External dependencies
 */
import classnames from 'classnames/dedupe';

/**
 * Internal dependencies
 */
import ColorPicker from '../../components/color-picker';
import URLPicker from '../../components/url-picker';
import ColorIndicator from '../../components/color-indicator';
import ToggleGroup from '../../components/toggle-group';
import RangeControl from '../../components/range-control';
import ApplyFilters from '../../components/apply-filters';
import getIcon from '../../utils/get-icon';

/**
 * WordPress dependencies
 */
const { applyFilters } = wp.hooks;
const { __ } = wp.i18n;
const { useSelect } = wp.data;

const {
  BaseControl,
  PanelBody,
  TextControl,
  ToggleControl,
  TabPanel,
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
} = wp.components;

const {
  InspectorControls,
  InnerBlocks,
  BlockControls,
  RichText,
  useBlockProps,
  useInnerBlocksProps,
} = wp.blockEditor;

/**
 * Block Edit Class.
 */
export default function BlockEdit(props) {
  const { attributes, setAttributes, isSelected, clientId } = props;

  let { className = '' } = props;

  const hasChildBlocks = useSelect(
    (select) => {
      const blockEditor = select('core/block-editor');

      return blockEditor ? blockEditor.getBlockOrder(clientId).length > 0 : false;
    },
    [clientId]
  );

  const {
    number,
    animateInViewport,
    animateInViewportFrom,
    numberPosition,
    numberAlign,
    numberSize,
    showContent,
    numberColor,
    hoverNumberColor,
    url,
    ariaLabel,
    target,
    rel,
  } = attributes;

  className = classnames('ghostkit-counter-box', className);
  className = applyFilters('ghostkit.editor.className', className, props);

  const classNameNumber = classnames(
    'ghostkit-counter-box-number',
    `ghostkit-counter-box-number-align-${numberPosition || 'left'}`,
    numberPosition === 'top'
      ? `ghostkit-counter-box-number-top-align-${numberAlign || 'center'}`
      : ''
  );

  const blockProps = useBlockProps({ className });
  const innerBlockProps = useInnerBlocksProps(
    { className: 'ghostkit-counter-box-content' },
    {
      renderAppender: hasChildBlocks ? undefined : InnerBlocks.ButtonBlockAppender,
      templateLock: false,
    }
  );

  return (
    <>
      <InspectorControls>
        <PanelBody>
          <RangeControl
            label={__('Number Size', 'ghostkit')}
            value={numberSize}
            onChange={(value) => setAttributes({ numberSize: value })}
            beforeIcon="editor-textcolor"
            afterIcon="editor-textcolor"
            allowCustomMax
          />
          <BaseControl label={__('Number Position', 'ghostkit')}>
            <div>
              <Toolbar label={__('Number Position', 'ghostkit')}>
                <ToolbarButton
                  icon="align-center"
                  title={__('Top', 'ghostkit')}
                  onClick={() => setAttributes({ numberPosition: 'top' })}
                  isActive={numberPosition === 'top'}
                />
                <ToolbarButton
                  icon="align-left"
                  title={__('Left', 'ghostkit')}
                  onClick={() => setAttributes({ numberPosition: 'left' })}
                  isActive={numberPosition === 'left'}
                />
                <ToolbarButton
                  icon="align-right"
                  title={__('Right', 'ghostkit')}
                  onClick={() => setAttributes({ numberPosition: 'right' })}
                  isActive={numberPosition === 'right'}
                />
              </Toolbar>
            </div>
          </BaseControl>
          {numberPosition === 'top' ? (
            <ToggleGroup
              label={__('Number Alignment', 'ghostkit')}
              value={numberAlign || 'center'}
              options={[
                {
                  icon: getIcon('icon-horizontal-start'),
                  label: __('Start', 'ghostkit'),
                  value: 'left',
                },
                {
                  icon: getIcon('icon-horizontal-center'),
                  label: __('Center', 'ghostkit'),
                  value: 'center',
                },
                {
                  icon: getIcon('icon-horizontal-end'),
                  label: __('End', 'ghostkit'),
                  value: 'right',
                },
              ]}
              onChange={(value) => {
                setAttributes({ numberAlign: value });
              }}
            />
          ) : null}
        </PanelBody>
        <PanelBody>
          <ToggleControl
            label={__('Show Content', 'ghostkit')}
            checked={!!showContent}
            onChange={(val) => setAttributes({ showContent: val })}
          />
          <ToggleControl
            label={__('Animate in viewport', 'ghostkit')}
            checked={!!animateInViewport}
            onChange={(val) => setAttributes({ animateInViewport: val })}
          />
          {animateInViewport ? (
            <TextControl
              label={__('Animate from', 'ghostkit')}
              type="number"
              value={animateInViewportFrom}
              onChange={(value) => setAttributes({ animateInViewportFrom: parseInt(value, 10) })}
            />
          ) : null}
        </PanelBody>
        <PanelBody
          title={
            <>
              {__('Colors', 'ghostkit')}
              <ColorIndicator colorValue={numberColor} />
            </>
          }
          initialOpen={false}
        >
          <TabPanel
            className="ghostkit-control-tabs ghostkit-control-tabs-wide"
            tabs={[
              {
                name: 'normal',
                title: __('Normal', 'ghostkit'),
                className: 'ghostkit-control-tabs-tab',
              },
              {
                name: 'hover',
                title: __('Hover', 'ghostkit'),
                className: 'ghostkit-control-tabs-tab',
              },
            ]}
          >
            {(tabData) => {
              const isHover = tabData.name === 'hover';
              return (
                <ApplyFilters
                  name="ghostkit.editor.controls"
                  attribute={isHover ? 'hoverNumberColor' : 'numberColor'}
                  props={props}
                >
                  <ColorPicker
                    label={__('Color', 'ghostkit')}
                    value={isHover ? hoverNumberColor : numberColor}
                    onChange={(val) =>
                      setAttributes(isHover ? { hoverNumberColor: val } : { numberColor: val })
                    }
                    alpha
                    gradient
                  />
                </ApplyFilters>
              );
            }}
          </TabPanel>
        </PanelBody>
      </InspectorControls>
      <URLPicker
        url={url}
        rel={rel}
        ariaLabel={ariaLabel}
        target={target}
        onChange={(data) => {
          setAttributes(data);
        }}
        isSelected={isSelected}
        toolbarSettings
        inspectorSettings
      />
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon="align-center"
            title={__('Top', 'ghostkit')}
            onClick={() => setAttributes({ numberPosition: 'top' })}
            isActive={numberPosition === 'top'}
          />
          <ToolbarButton
            icon="align-left"
            title={__('Left', 'ghostkit')}
            onClick={() => setAttributes({ numberPosition: 'left' })}
            isActive={numberPosition === 'left'}
          />
          <ToolbarButton
            icon="align-right"
            title={__('Right', 'ghostkit')}
            onClick={() => setAttributes({ numberPosition: 'right' })}
            isActive={numberPosition === 'right'}
          />
        </ToolbarGroup>
      </BlockControls>
      <div {...blockProps}>
        <div className={classNameNumber}>
          <RichText
            inlineToolbar
            tagName="div"
            className="ghostkit-counter-box-number-wrap"
            placeholder={__('Write number…', 'ghostkit')}
            value={number}
            onChange={(value) => setAttributes({ number: value })}
            withoutInteractiveFormatting
          />
        </div>
        {showContent ? <div {...innerBlockProps} /> : null}
      </div>
    </>
  );
}
