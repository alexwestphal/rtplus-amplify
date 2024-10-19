
import { MemberStatusType } from "@/lib/d4h-api/member-response"

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

export interface MemberStatusProps {
    status: MemberStatusType
}

export function MemberStatus({status}: MemberStatusProps) {
    if(status == 'OPERATIONAL') {
        return <span className="text-green-700">YES</span>
    } else if(status == 'NON_OPERATIONAL') {
        return <span className="text-orange-700">NO</span>
    } else if(status == 'OBSERVER') {
        return <span>Observer</span>
    } else if(status == 'RETIRED') {
        return <span>Retired</span>
    } else {
        return <span>Unknown</span>
    }
}

