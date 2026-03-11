import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { useState, useRef } from 'react';
import type { OptionType } from 'src/constants/articleProps';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(initialState);
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isPanelOpen,
		rootRef: formRef,
		onClose: () => setIsPanelOpen(false),
		onChange: setIsPanelOpen,
	});

	const handleFontChange = (option: OptionType) =>
		setFormState({ ...formState, fontFamilyOption: option });

	const handleFontSizeChange = (option: OptionType) =>
		setFormState({ ...formState, fontSizeOption: option });

	const handleWidthChange = (option: OptionType) =>
		setFormState({ ...formState, contentWidth: option });

	const handleBgColorChange = (option: OptionType) =>
		setFormState({ ...formState, backgroundColor: option });

	const handleFontColorChange = (option: OptionType) =>
		setFormState({ ...formState, fontColor: option });

	const handleApply = () => {
		console.log('Применены настройки:', formState);
		onApply(formState);
		setIsPanelOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton
				isOpen={isPanelOpen}
				onClick={() => setIsPanelOpen(!isPanelOpen)}
			/>
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isPanelOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleFontChange}
						placeholder='Выберите шрифт'
					/>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFontColorChange}
					/>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleBgColorChange}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
