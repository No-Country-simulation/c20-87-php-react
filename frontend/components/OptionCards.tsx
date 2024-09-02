import React from 'react';

type OptionCardProps = {
    icon: React.ElementType;
    title: string;
};

const OptionCard: React.FC<OptionCardProps> = ({ icon: Icon, title }) => {
    return (
        <div className="flex flex-col items-center w-[120px]">
            <div className="w-[100px] h-[100px] bg-myCustomColor-secundary rounded-full flex justify-center items-center p-2">
                <Icon width={60} height={60} />
            </div>
            <p className="text-center">{title}</p>
        </div>
    );
};

export default OptionCard;